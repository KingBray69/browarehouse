import { useState } from "react";
import { storage } from "../firebase/clientApp";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Admin() {
  // Manual‐add states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // AliExpress‐import states
  const [aliUrl, setAliUrl] = useState("");

  // Status messages
  const [status, setStatus] = useState("");

  // Upload image to Firebase Storage, then call /api/addProduct with imageURL + other fields
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !imageFile) {
      setStatus("Please fill in all fields and select an image.");
      return;
    }
    setStatus("Uploading image…");
    const fileRef = storageRef(
      storage,
      `product-images/${Date.now()}_${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(fileRef, imageFile);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error(error);
        setStatus("Image upload failed.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Now send data to our API to add product to Firestore
        setStatus("Saving product…");
        try {
          const res = await fetch("/api/addProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              price: parseFloat(price),
              description,
              imageUrl: downloadURL,
            }),
          });
          const json = await res.json();
          if (res.ok) {
            setStatus("Product added successfully!");
            // Clear fields
            setName("");
            setPrice("");
            setDescription("");
            setImageFile(null);
          } else {
            console.error(json);
            setStatus(`Error: ${json.error}`);
          }
        } catch (err) {
          console.error(err);
          setStatus("Network error.");
        }
      }
    );
  };

// ... (above this is your handleManualSubmit logic)

  // 2. AliExpress import: paste URL → call RapidAPI → add to Firestore
  const handleAliSubmit = async (e) => {
    e.preventDefault();
    if (!aliUrl) {
      setStatus("Please paste an AliExpress product URL.");
      return;
    }
    setStatus("Fetching AliExpress product…");
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aliUrl }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("AliExpress product added successfully!");
        setAliUrl("");
      } else {
        console.error(json);
        setStatus(`Error: ${json.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error when fetching AliExpress.");
    }
  };

// ... (below this is your return JSX)


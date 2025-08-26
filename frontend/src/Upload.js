import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images");

    const res = await fetch("https://api.cloudinary.com/v1_1/dtiasevyl/image/upload", {
      method: "POST",
      body: data,
    });

    const cloudData = await res.json();
    console.log("Cloudinary URL:", cloudData.secure_url);
    setImageUrl(cloudData.secure_url);

   
    await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productImg: cloudData.secure_url }),
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <p>Uploaded:</p>
          <img src={imageUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
}

export default Upload;

function EditProduct() {
  return (
     <></>
  	)
}

export default EditProduct;

// delete image
// const deleteImage = async () => {
//   const res = await fetch("http://localhost:5000/delete-image", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id: "mlcqxkcvpihkgtfsh4p5" }),
//   });
//   const data = await res.json();
//   console.log("Deleted:", data);
// };

// // rename image
// const renameImage = async () => {
//   const res = await fetch("http://localhost:5000/rename-image", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       old_id: "mlcqxkcvpihkgtfsh4p5",
//       new_id: "my-new-image-name",
//     }),
//   });
//   const data = await res.json();
//   console.log("Renamed:", data);
// };


// <button onClick={deleteImage}>Delete</button>
// <button onClick={renameImage}>Rename</button>

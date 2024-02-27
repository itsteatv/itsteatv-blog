export const ImageUploadByFile = async (image) => {
  console.log(image);

  let imageUrl = null;

  const requestOptions = {
    method: "POST",
    body: image,
  };

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dzu7lvro4/image/upload`,
    requestOptions
  );
  const data = await response.json();
  imageUrl = data.url;

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  console.log(response);
  console.log(data);

  return data;
};

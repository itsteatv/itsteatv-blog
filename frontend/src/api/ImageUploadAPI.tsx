export const ImageUploadAPI = async (FormData: FormData) => {
  console.log(FormData);
  const requestOptions = {
    method: "POST",
    body: FormData,
  };

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUD_NAME
    }/image/upload`,
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  console.log(response);
  console.log(data);

  return data;
};

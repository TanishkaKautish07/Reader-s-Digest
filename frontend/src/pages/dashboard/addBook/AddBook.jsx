import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setimageFileName] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [bookFileName, setBookFileName] = useState("");
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("trending", data.trending);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    if (imageFile) formData.append("coverImage", imageFile);
    if (bookFile) formData.append("pdf", bookFile);

    try {
      await addBook(formData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
      setimageFileName("");
      setimageFile(null);
      setBookFileName("");
      setBookFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };

  const handleBookFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookFile(file);
      setBookFileName(file.name);
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=""
        encType="multipart/form-data"
      >
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
            { value: "free", label: "Free" }, // New category
          ]}
          register={register}
        />

        {/* Show book file upload if 'Free' category is selected */}
        {watch("category") === "free" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Book File
            </label>
            <input
              type="file"
              accept=".pdf,.epub"
              name="pdf"
              onChange={handleBookFileChange}
              className="mb-2 w-full"
            />
            {bookFileName && (
              <p className="text-sm text-gray-500">Selected: {bookFileName}</p>
            )}
          </div>
        )}

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="coverImage"
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Adding.. </span>
          ) : (
            <span>Add Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBook;

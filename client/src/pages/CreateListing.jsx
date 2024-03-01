import React from "react";

export const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Listing</h1>
      <form action="" className="flex sm:flex-row flex-col  gap-4 flex-1">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            placeholder="Name"
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            id="description"
            placeholder="Description"
            required
          ></textarea>
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="address"
            placeholder="Address"
            required
          />
          <div className="flex flex-wrap  gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5 " />
              <span className="">Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 " />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 " />
              <span className="">Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 " />
              <span className="">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300  rounded-lg"
                required
                id="bedRooms"
                max="10"
                min="1"
              />
              <span>Beds</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300  rounded-lg"
                required
                id="bathRooms"
                max="10"
                min="1"
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300  rounded-lg"
                required
                id="regularPrice"
                max="10"
                min="1"
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300  rounded-lg"
                required
                id="discountPrice"
                max="10"
                min="1"
              />
              <div className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Image:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the couver (max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              className="p-3 border border-gray-300 rounded w-full"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

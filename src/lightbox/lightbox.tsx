export default function Lightbox(){
    return (
      <div className="bg-lightbox-bg absolute left-0 h-full z-20 w-full flex justify-center items-start">
        <div className="w-[25%] bg-white p-8  rounded-lg mt-[10%]">
          <h2 className="heading-m mb-4">Confirm Deletion</h2>
          <p className="body text-secondary-font mb-8">
            Are you sure you want to delete invoice Xmlsadas?
          </p>
          <div className="flex">
            <div className="mr-2 ml-auto">
              <button className="btn bg-table-background text-primary text-center ">
                Cancel
              </button>
            </div>
            <div className="mr-2">
              <button className="btn bg-delete-bg text-white">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
}
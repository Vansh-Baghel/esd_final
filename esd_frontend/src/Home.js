import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [ownerRef, setownerRef] = useState("");
  const [priceRef, setpriceRef] = useState("");
  const [carRef, setcarRef] = useState("");
  const [colorRef, setcolorRef] = useState("");
  const [cars, setCars] = useState([{}]);
  const [name, setName] = useState("");

  const ENDPOINT_BACKEND = "http://localhost:5000";

  const handleSubmit = async () => {
    const resp = await axios.post(`${ENDPOINT_BACKEND}/post_car`, {
      name: carRef,
      owner: ownerRef,
      color: colorRef,
      price: priceRef,
    });
    console.log(resp.data);

    toast.success("Data Sent Successfully!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    closeModal();
  };

  const getAllData = async () => {
    const resp = await axios.get(`${ENDPOINT_BACKEND}/get_car`);
    setCars(resp.data.cars);
  };

  const deleteCar = async (name) => {
    const resp = await axios.delete(`${ENDPOINT_BACKEND}/delete_car/${name}`);
    console.log(resp.data);

    getAllData()
  };

  return (
    <div>
      <button className='text-white mr-10' onClick={openModal}>
        Add
      </button>
      <button className='text-white' onClick={getAllData}>
        Get
      </button>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='dark'
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='p-4'>
          <form className='w-full max-w-lg border-2 border-slate-500 rounded-md p-4'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Enter Your Name
                </label>
                <input
                  required
                  onChange={(event) => setownerRef(event.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Jane'
                />
              </div>
              <div className='w-full px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Car Model
                </label>
                <input
                  required
                  onChange={(event) => setcarRef(event.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Jane'
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Color
                </label>
                <input
                  required
                  onChange={(event) => setcolorRef(event.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  type='text'
                  placeholder='Black'
                />
              </div>

              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Price
                </label>
                <input
                  required
                  onChange={(event) => setpriceRef(event.target.value)}
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  type='text'
                  placeholder='90210'
                />
              </div>
              <div className='w-full flex mt-6 justify-center'>
                <input
                  required
                  onChange={(event) => setownerRef(event.target.value)}
                  type='button'
                  value='Send'
                  onClick={handleSubmit}
                  className='bg-violet-500 shadow-xl hover:shadow-none duration-300 w-1/2 py-2 rounded-md text-white  text-xl cursor-pointer  active:bg-violet-600'
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* table */}
      <table className='text-white'>
        {cars.map((car) => {
          return (
            <tr>
              <td>{car.name}</td>
              <td>{car.owner}</td>
              <td>{car.price}</td>
              <td>{car.color}</td>
              <button
                onClick={() => {
                    deleteCar(car.name)
                }}
              >
                Delete
              </button>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Home;

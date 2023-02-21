import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";
import { FaRegWindowClose, FaFileUpload } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import "./Modal.css";
function ModalSave({ modalIsOpen, closeModal }) {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setUrl(`https://melodiv.netlify.app/?q=${data}`);
    }
  }, [data]);
  const { bpmValue, nbrOfBeat, rhythmTrackArray, melodicTrackArray } =
    usePlayerContext();

  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setData(null);
        closeModal();
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
          color: "white",
          fontSize: 20,
        }}
      >
        Sauvegardez votre musique
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 50px 0 50px",
          color: "white",
          fontSize: 20,
        }}
      >
        <p style={{ textAlign: "center" }}>
          Il est possible de sauvegarder votre musique pour pouvoir la partager ou
          la modifier plus tard
        </p>
        {!data && !loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "30px 100px 0 100px",
            }}
          >
            <button
              onClick={() => {
                setLoading(true);
                axios
                  .post("https://api-melodiv.onrender.com/", {
                    melodic: melodicTrackArray,
                    rythm: rhythmTrackArray,
                    bpm: bpmValue,
                    measureNb: nbrOfBeat,
                  })
                  .then(function (response) {
                    setLoading(false);
                    setData(response.data._id);
                  })
                  .catch(function (error) {
                    setLoading(false);
                    console.log("error", error);
                  });
              }}
            >
              <Flex flexDirection="row">
                <FaFileUpload
                  color="#e74138"
                  size={"25"}
                  style={{ margin: "5 5 0 0" }}
                />
                Sauvegarder
              </Flex>
            </button>
            <button onClick={closeModal}>
              <Flex flexDirection="row">
                <FaRegWindowClose
                  color="#e74138"
                  size={"25"}
                  style={{ margin: "5 5 0 0" }}
                />
                Fermer
              </Flex>
            </button>
          </div>
        ) : !data && loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              margin: "30px 100px 0 100px",
            }}
          >
            <div className="spinner"></div>
          </div>
        ) : data && !loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "30px 0 0 0",
              fontSize: 20,
            }}
          >
            <p style={{ color: "white" }}>
              Retrouver votre musique grâce à ce lien
            </p>
            <a style={{ color: "#e74138", textDecoration: "none" }} href={url}>
              https://melodiv.netlify.app/?q={data}
            </a>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    borderRadius: "10px",
    border: "none",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    width: "550px",
    minHeight: "300px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "9999",
  },
};

export default ModalSave;

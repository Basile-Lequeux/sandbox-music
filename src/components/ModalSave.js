import { useState, useEffect } from "react";
import { Flex, useClipboard, Input, Button  } from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";
import { FaRegWindowClose, FaFileUpload } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import Modal from "react-modal";
import axios from "axios";
import "./Modal.css";

function ModalSave({ modalIsOpen, closeModal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { onCopy, value: url, setValue: setUrl, hasCopied } = useClipboard("");

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
          display: 'flex',
          justifyContent: 'center',
          
        }}
      >
        Save your music  <GiMusicalNotes color="tomato"/>
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
          You can save your music and share it, or modify it later.
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
                Save
              </Flex>
            </button>
            <button onClick={closeModal}>
              <Flex flexDirection="row">
                <FaRegWindowClose
                  color="#e74138"
                  size={"25"}
                  style={{ margin: "5 5 0 0" }}
                />
                Close
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
              Share your music with this link !
            </p>
            <Flex mb={2}>
        <Input
          value={url}
          onChange={(e) => {
            setUrl(url);
          }}
          mr={2}
        />
        <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
      </Flex>
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

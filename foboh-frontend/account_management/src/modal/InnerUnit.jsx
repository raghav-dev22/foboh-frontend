import React, { useRef } from "react";
import { Button, Modal } from "antd";

const InnerUnit = ({ open, onOk, onCancel }) => {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Modal title="Basic Modal" open={open} onOk={onOk} onCancel={onCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default InnerUnit;

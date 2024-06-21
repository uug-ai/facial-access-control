"use client";

import { RootState } from "@/lib/store";
import { Button, Text, Row } from "./ui";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hideDialog } from "@/lib/features/dialog/dialogSlice";

type DialogProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

//TODO move to ui library

const Dialog = ({ title, onClose, children }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isVisible = useAppSelector(
    (store: RootState) => store.dialog.isVisible
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isVisible]);

  const closeDialog = () => {
    onClose();
    dispatch(hideDialog());
  };

  const dialog: JSX.Element | null = (
    <dialog
      ref={dialogRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl p-8"
    >
      <Row className="justify-between mb-4">
        <Text as="h2" size="2xl">
          {title}
        </Text>
        <Button onClick={closeDialog}>x</Button>
      </Row>
      {children}
    </dialog>
  );

  return dialog;
};

export default Dialog;

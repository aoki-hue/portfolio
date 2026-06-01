"use client";

// import clsx from "clsx";
import { useState } from "react";
import SectionContainer from "@/components/common/SectionContainer";
import Input from "@/components/common/form/Input";
import Confirm from "@/components/common/form/Confirm";
import Button from "@/components/common/Button";
import TextArea from "@/components/common/form/TextArea";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <SectionContainer
      title="Contact"
      text="お問い合わせ"
      isBg={true}
      isContact={true}
    >
      <div className={styles["contact-inner"]}>
        {step === "input" && (
          <>
            <div className={styles.contact}>
              <Input
                id="name"
                label="お名前"
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
              />
              <Input
                id="email"
                label="メールアドレス"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <TextArea
                id="message"
                label="ご用件"
                value={formData.message}
                onChange={handleChange("message")}
              />
            </div>
            <div className={styles["button-wrap"]}>
              <Button
                text="送信内容を確認する"
                addClass="primary"
                type="button"
                onClick={() => setStep("confirm")}
              />
            </div>
          </>
        )}
        {step === "confirm" && (
          <>
            <div className={styles.contact}>
              <Confirm label="お名前" value={formData.name} />
              <Confirm label="メールアドレス" value={formData.email} />
              <Confirm label="ご用件" value={formData.message} />
            </div>
            <div className={styles["button-wrap"]}>
              <Button
                text="入力を修正する"
                addClass="tertiary"
                type="button"
                onClick={() => setStep("input")}
              />
              <Button
                text="送信する"
                addClass="primary"
                type="submit"
                onClick={() => setStep("complete")}
              />
            </div>
          </>
        )}
        {step === "complete" && (
          <>
            <div>送信完了</div>
            <div className={styles["button-wrap"]}>
              <Button
                text="入力へ戻る"
                addClass="tertiary"
                type="reset"
                onClick={() => setStep("input")}
              />
            </div>
          </>
        )}
        {/* <div className={styles.contact}>
          <Input id="name" label="お名前" type="text" />
          <Input id="email" label="メールアドレス" type="email" />
          <TextArea id="message" label="ご用件" />
        </div>
        <div className={styles["button-wrap"]}>
          <Button text="送信内容を確認する" addClass="primary" />
        </div> */}
      </div>
    </SectionContainer>
  );
};

export default Contact;

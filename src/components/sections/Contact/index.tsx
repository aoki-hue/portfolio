"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionContainer from "@/components/common/SectionContainer";
import Input from "@/components/common/form/Input";
import Confirm from "@/components/common/form/Confirm";
import Button from "@/components/common/Button";
import TextArea from "@/components/common/form/TextArea";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");

  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const initialErrors = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState(initialErrors);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォームの入力値を検証する（バリデーションチェック）
  const validate = (data: typeof formData) => {
    return {
      name: data.name.trim() === "" ? "お名前を入力してください" : "",
      email:
        data.email.trim() === ""
          ? "メールアドレスを入力してください"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
            ? "メールアドレス形式で入力してください"
            : "",
      message:
        data.message.trim() === "" ? "お問い合わせ内容を入力してください" : "",
    };
  };

  // フォームの入力値が変更された際、formDataを更新する
  const handleChange = (field: keyof typeof formData) => (value: string) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(newFormData);
    setErrors(validate(newFormData));
  };

  // バリデーションチェックの結果により、確認ボタンの状態を 活性/非活性にする
  const isValid = useMemo(() => {
    return (
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value.trim() !== "")
    );
  }, [errors, formData]);

  // 送信ボタンを押下した際、APIにデータを送信する
  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      setStep("complete");
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer
      id="contact"
      title="Contact"
      text="お問い合わせ"
      isBg={true}
      isContact={true}
    >
      <div className={styles["contact-inner"]}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.contact}>
                  <Input
                    id="name"
                    label="お名前"
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    error={errors.name}
                  />
                  <Input
                    id="email"
                    label="メールアドレス"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    error={errors.email}
                  />
                  <TextArea
                    id="message"
                    label="ご用件"
                    value={formData.message}
                    onChange={handleChange("message")}
                    error={errors.message}
                  />
                </div>
                <div className={styles["button-wrap"]}>
                  <Button
                    text={
                      isValid
                        ? "入力内容を確認する"
                        : "入力内容を確認してください"
                    }
                    addClass="primary"
                    type="button"
                    onClick={() => setStep("confirm")}
                    disabled={!isValid}
                  />
                </div>
              </motion.div>
            )}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.contact}>
                  <Confirm label="お名前" value={formData.name} />
                  <Confirm label="メールアドレス" value={formData.email} />
                  <Confirm label="ご用件" value={formData.message} />
                </div>
                <div className={styles["button-wrap"]}>
                  <Button
                    text="入力を修正する"
                    addClass="secondary"
                    type="button"
                    onClick={() => setStep("input")}
                  />
                  <Button
                    text={isSubmitting ? "送信中..." : "送信する"}
                    addClass="primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  />
                </div>
              </motion.div>
            )}
            {step === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.contact}>
                  <p>
                    お問い合わせありがとうございます。
                    <br />
                    メッセージを受け付けました。
                  </p>
                </div>
                <div className={styles["button-wrap"]}>
                  <Button
                    text="入力へ戻る"
                    addClass="secondary"
                    type="reset"
                    onClick={() => setStep("input")}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};

export default Contact;

import React from "react";
import {  Modal } from "antd";
import { Input, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

const UserModal: React.FC<UserModalProps> = (props) => {
  const { isOpen, onClose, onConfirm, isLoading } = props;
  const { control } = useFormContext();

  return (
    <>
      <Modal
        title="Thông tin người dùng"
        open={isOpen}
        onOk={onConfirm}
        confirmLoading={isLoading}
        onCancel={onClose}
      >
        <Controller
          name="name"
          rules={{ required: "Trường này là bắt buộc!" }}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <LabeledInput
                error={!!error}
                label="Tên người dùng"
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Tên người dùng"
              />
            );
          }}
        />

        <Controller
          name="age"
          rules={{ required: "Trường này là bắt buộc!" }}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <LabeledInput
                error={!!error}
                label="Tuổi"
                placeholder="Nhập tuổi"
                isNumber
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />

        <Controller
          name="address"
          rules={{ required: "Trường này là bắt buộc!" }}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <LabeledInput
                error={!!error}
                label="Địa chỉ"
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Địa chỉ"
              />
            );
          }}
        />

        <Controller
          name="career"
          rules={{ required: "Trường này là bắt buộc!" }}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <LabeledInput
                error={!!error}
                label="Nghề nghiệp"
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Nghề nghiệp"
              />
            );
          }}
        />
      </Modal>
    </>
  );
};

export default React.memo(UserModal);

interface LabeledInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  error?: boolean;
  isNumber?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  error,
  isNumber,
}) => (
  <Form.Item label={label}>
    <Input
      type={isNumber ? "number" : "text"}
      status={error ? "error" : ""}
      value={value}
      name={name}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
    {error && <div style={{ color: "red" }}>Trường này là bắt buộc</div>}
  </Form.Item>
);

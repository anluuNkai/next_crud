"use client";
import UserModal from "@/components/userModal";
import { useUsers } from "@/hooks/user";
import { Button, Modal, Space, Table, TableProps, Tag } from "antd";
import { FormProvider} from "react-hook-form";
interface DataType {
  key?: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}



export default function Home() {
  const [
    {
      isLoading,
      users,
      methodForm,
      isModalOpen,
      isModalOpenDelete,
    },
    {
      setSelectedId,
      handleOpenModal,
      handleOpenDeleteModal,
      handleCloseModal,
      handleOk,
      handleConfirmDelete,
      handleCloseDeleteModal,
    },
  ] = useUsers()

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Nghề nghiệp",
      key: "career",
      dataIndex: "career",
      render: (tags) => (
        <>
          <Tag color={"green"}>{tags}</Tag>
        </>
      ),
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedId(record.id);
              handleOpenModal(record);
            }}
          >
            Sửa
          </Button>
          <Button
            color="danger"
            onClick={() => {
              handleOpenDeleteModal();
              setSelectedId(record.id);
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#f5f5f5]">
      <div className="flex  flex-col gap-3  items-center sm:items-start">
        <Button onClick={handleOpenModal} type="primary">
          Thêm mới
        </Button>

        <Table
          loading={isLoading}
          className="max-w-6xl"
          columns={columns}
          dataSource={users}
          pagination={false}
        />
      </div>
      <FormProvider {...methodForm}>
        <UserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleOk}
          isLoading={isLoading}
        />
      </FormProvider>
      <Modal
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      >
        <p>Bạn có muốn xóa người đùng này không ?</p>
      </Modal>{" "}
    </div>
  );
}

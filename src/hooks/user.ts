import { createUser, deleteUser, getUser, updateUser } from "@/apis/user";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type UserFormType = {
  name: string;
  age: string;
  address: string;
  career: string;
};
interface User {
  id?: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}
type UseUsersReturn = [
  {
    isLoading: boolean;
    users: User[];
    methodForm: UseFormReturn<UserFormType>;
    isModalOpen: boolean;
    isModalOpenDelete: boolean;
    page:number
  },
  {
    setSelectedId: (id: string) => void;
    handleOpenModal: (record?: any) => void;
    handleOpenDeleteModal: () => void;
    handleCloseModal: () => void;
    handleOk: () => void;
    handleConfirmDelete: () => void;
    handleCloseDeleteModal: () => void;
    handleChangePage:(page:number) => void
  }
];
export const defaultUserValues = {
  name: "",
  age: "",
  career: "",
  address: "",
};
export const pagination = {
  page: 1,
  limit: 5,
};
export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsOpenDeleteModal] = useState(false);
  const [selectId, setSelectedId] = useState<string>("");
  const [page, setPage] = useState(pagination.page);
  const handleChangePage = (page:number) =>{
    console.log('func run', page);
    
    setPage(page)
  }
  const methodForm = useForm<UserFormType>({
    defaultValues: defaultUserValues,
  });
  const { handleSubmit, reset } = methodForm;

  const handleFetchUser = async () => {
    try {
      setIsLoading(true);
      const results = await getUser(page, pagination.limit);
      setUsers(results?.data);
      console.log(results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (record: any) => {
    setIsModalOpen(true);
    if (record) {
      reset({ ...record });
    }
  };

  const handleOk = handleSubmit(async (data) => {
    try {
      if (selectId) {
        await updateUser(selectId, data);
      } else {
        const payload = {
          name: data.name,
          age: data.age,
          address: data.address,
          career: data.career,
        };
        const result = await createUser(payload);
        console.log(result);
      }
      setIsModalOpen(false);
      handleFetchUser();
      reset(defaultUserValues);
    } catch (error) {
      console.log(error);
    }
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId("");
    reset(defaultUserValues);
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setSelectedId("");
  };

  const handleConfirmDelete = async () => {
    try {
      message.success("Xóa thành công");
      setIsLoading(true);
      await deleteUser(selectId);
      handleCloseDeleteModal();
      handleFetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, [page]);

  return [
    {
      isLoading,
      users,
      methodForm,
      isModalOpen,
      isModalOpenDelete,
      page
    },
    {
      setSelectedId,
      handleOpenModal,
      handleOpenDeleteModal,
      handleCloseModal,
      handleOk,
      handleConfirmDelete,
      handleCloseDeleteModal,
      handleChangePage
    },
  ];
};

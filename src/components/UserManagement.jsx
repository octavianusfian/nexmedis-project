import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./UI/Button";
import InputField from "./UI/InputField";
import {
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdCancel, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../redux/userSlice";
import { IoIosSave } from "react-icons/io";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserManagement = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  // const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const edit = (record) => {
    form.setFieldsValue({
      email: "",
      first_name: "",
      last_name: "",
      ...record,
    });
    console.log(record.id);

    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  // useEffect(() => {
  //   axios.get("https://reqres.in/api/users").then((res) => {
  //     let getUsers = res.data.data;
  //     getUsers = getUsers.slice(0, 3);
  //     console.log(getUsers);

  //     setUsers(getUsers);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchUsers());
  //   }
  // }, [status, dispatch]);

  function resetField() {
    setEmail("");
    setFirstName("");
    setLastName("");
  }

  const handleCreate = async () => {
    if (!email || !firstName || !lastName) {
      errorMessage("Data belum lengkap, silahkan lengkapi.");
      return;
    }

    if (!email.includes("@")) {
      errorMessage("Email tidak sesuai, Silahkan masukkan email yang benar");
      return;
    }
    successMessage("User berhasil dibuat.");
    resetField();
    const newUser = {
      id: Math.random().toString(36).substring(7), // ID random
      first_name: firstName,
      last_name: lastName,
      email,
    };
    dispatch(addUser(newUser));
    resetField;
  };

  const handleUpdate = async (id) => {
    try {
      const row = await form.validateFields();
      const newUsers = [...users];
      const index = newUsers.findIndex((item) => id === item.id);
      if (index > -1) {
        console.log({ id: id, ...row });

        dispatch(updateUser({ id: id, ...row }));

        setEditingKey("");
        successMessage("Update Data berhasil");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      errorMessage("Update Data Gagal, Silahkan coba lagi");
    }
  };

  const handleDelete = async (id) => {
    dispatch(deleteUser(id));
    successMessage("Hapus Data berhasil");
  };

  const errorMessage = (content) => {
    messageApi.open({
      type: "error",
      content,
    });
  };
  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      align: "center",
      render: (text, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            {/* <Typography.Link
              onClick={() => handleUpdate(record.id)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link> */}
            <Button
              icon={<IoIosSave />}
              type="primary"
              className={"!px-1 !py-1 !mb-0"}
              onClick={() => handleUpdate(record.id)}
            />
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button
                icon={<MdCancel />}
                type="primary"
                className={"!px-1 !py-1 !mb-0"}
                style={{
                  backgroundColor: "red",
                }}
              />
            </Popconfirm>
          </Space>
        ) : (
          <Space size="middle">
            <Button
              icon={<MdModeEditOutline />}
              type="primary"
              className={"!px-1 !py-1 !mb-0"}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            ></Button>
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<RiDeleteBin7Fill />}
                type="primary"
                disabled={editingKey !== ""}
                className={`!px-1 !py-1 !mb-0`}
                style={{
                  backgroundColor: editingKey === "" && "red",
                }}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className=" w-full">
      {contextHolder}
      {status === "loading" && <p>Loading...</p>}
      {/* <h2 className="text-xl font-semibold mb-2">Manage Users</h2> */}
      {status === "succeeded" && (
        <>
          <div className="flex w-full flex-col justify-center gap-3 items-center lg:flex-row ">
            <InputField
              type="text"
              title={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lg:flex-grow lg:basis-1/3" // Email lebih besar
            />
            <InputField
              type="text"
              title={"First Name"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="lg:basis-1/4" // Lebih kecil dari Email
            />
            <InputField
              type="text"
              title={"Last Name"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="lg:basis-1/4" // Lebih kecil dari Email
            />
            <Button
              onClick={handleCreate}
              className="w-full !mb-0 mt-2 lg:w-[100px] !lg:mb-0"
            >
              Create
            </Button>
          </div>
          <div className="w-full overflow-auto mt-8 lg:mt-0">
            <Form form={form} component={false}>
              <Table
                bordered
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                columns={mergedColumns}
                pagination={false}
                dataSource={users}
                scroll={{
                  y: 300,
                  x: 600,
                }}
              />
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;

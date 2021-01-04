import React, { useEffect } from "react";

import { List, Avatar, Button, Skeleton, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelInitLoading,
  cancelLoading,
  loadMoreInit,
  loadMoreUsers,
  getUsers,
  loadMoreFailed,
  deleteUsers,
  banUsers,
  unbanUsers, addAdmin, removeAdmin
} from "../../JS/actions/admin";
import axios from "axios";
import "./AllUsers.css";
import { UserDeleteOutlined, WarningOutlined } from "@ant-design/icons";

const AllUsers = () => {
  const token = localStorage.getItem('token');
  const { data, initLoading, loading, list } = useSelector(
    (state) => state.adminReducer
  );
  const dispatch = useDispatch();
  const deleteUser = async (userId, userName) => {
    try {
      const res = await axios.delete(`/admin/delete/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(deleteUsers(userId));
      message.success(`${userName} successfully deleted`);
      console.log("delete", res.data);
      //
    } catch (err) {
      message.error("server error");
    }
  };
  const banUser = async (userId, userName) => {
    try {
      const res = await axios.patch(`/admin/ban/${userId}`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(banUsers(userId));
      message.success(`${userName} successfully banned ! `);
      console.log("delete", res.data);
      //
    } catch (err) {
      message.error("server error");
    }
  };
  const unBanUser = async (userId, userName) => {
    try {
      const res = await axios.patch(`/admin/ban/${userId}`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(unbanUsers(userId));
      message.success(`${userName} successfully unbanned ! `);

      //
    } catch (err) {
      message.error("server error");
    }
  };
  //Add admin/remove admin
  const add_Admin = async (userId, userName) => {
    try {
      const res = await axios.patch(`/admin/add_admin/${userId}`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(addAdmin(userId));
      message.success(`${userName} successfully added as admin ! `);
      //
    } catch (err) {
      message.error("server error");
    }
  };
  const remove_Admin = async (userId, userName) => {
    try {
      const res = await axios.patch(`/admin/add_admin/${userId}`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(removeAdmin(userId));
      message.success(`${userName} successfully removed from admin list ! `);

      //
    } catch (err) {
      message.error("server error");
    }
  };

  //
  const onLoadMore = async () => {
    try {
      dispatch(loadMoreInit());
      const res = await axios.get("/admin/all_info", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (JSON.stringify(data) !== JSON.stringify(res.data)) {
        dispatch(loadMoreUsers(res.data));
        window.dispatchEvent(new Event("resize"));
      } else {
        message.info("no more users to load");
        dispatch(loadMoreFailed());
        // dispatch(cancelLoading());
      }
    } catch (error) {
      message.error("server error");
      // setState({ ...state, loading: false }, () => {
      //   window.dispatchEvent(new Event("resize"));
      // });
      // console.log("state", state);
      dispatch(cancelLoading());
    }
  };
  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const res = await axios.get("/admin/all_info", {
            headers: {
              Authorization: `${token}`,
            },
          });
          dispatch(getUsers(res.data));
          // setState({
          //   ...state,
          //   initLoading: false,
          //   data: res.data,
          //   list: res.data,
          // });
        } catch (error) {
          message.error("server error");
          dispatch(cancelInitLoading());
        }
      };
      getData();
    }
  }, [token, dispatch]);

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore} type="primary">
          loading more
        </Button>
      </div>
    ) : null;
  return (
    <div style={{ height: "100%", padding: 20, marginTop: 100 }}>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            style={{ backgroundColor: "white", margin: 20, borderRadius: 15 }}
            actions={[
              <Button
                type="primary"
                danger
                icon={<UserDeleteOutlined />}
                onClick={() => {
                  deleteUser(item._id, `${item.name} ${item.lastName}`);
                }}
              >
                Delete
              </Button>,
              item.isBan === true ? (
                <Button
                  type="primary"
                  icon={<WarningOutlined />}
                  onClick={() => {
                    unBanUser(item._id, `${item.name} ${item.lastName}`);
                  }}
                >
                  UnBan
                </Button>
              ) : (
                  <Button
                    type="primary"
                    danger
                    icon={<WarningOutlined />}
                    onClick={() => {
                      banUser(item._id, `${item.name} ${item.lastName}`);
                    }}
                  >
                    Ban
                  </Button>
                ),
              item.isAdmin === true ? (
                <Button
                  type="primary"
                  icon={<WarningOutlined />}
                  onClick={() => {
                    remove_Admin(item._id, `${item.name} ${item.lastName}`);
                  }}
                >
                  Remove admin
                </Button>
              ) : (
                  <Button
                    type="primary"
                    danger
                    icon={<WarningOutlined />}
                    onClick={() => {
                      add_Admin(item._id, `${item.name} ${item.lastName}`);
                    }}
                  >
                    Add admin
                  </Button>
                )
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.img} />}
                title={<span>{`${item.name} ${item.lastName}`}</span>}
              />
              <div>
                <span style={{ margin: 10 }}>Status : {item.isClient ? <span>Client</span> : item.isLawyer ? <span>Lawyer</span> : <span>Admin</span>}</span>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllUsers;

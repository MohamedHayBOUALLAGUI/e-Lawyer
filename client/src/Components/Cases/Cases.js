import React, { useEffect } from "react";
import formatDate from '../../utils/formatDate';
import { List, Avatar, Button, Skeleton, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelLoading,
  loadMoreInit,
} from "../../JS/actions/admin";
import {
  deleteCase,acceptCase
} from "../../JS/actions/case";
import axios from "axios";
import "./AllUsers.css";
import { CloseCircleFilled, WarningOutlined } from "@ant-design/icons";
import { getUserCases, getLawyerCases } from '../../JS/actions/case';
import { current } from '../../JS/actions/user';



const Cases = () => {
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
 dispatch(current())
  }, []);

  useEffect(() => {
    if(user!==null)
    {if(user.isLawyer==true)
    {dispatch(getLawyerCases());}}
  }, [user]);
  useEffect(() => {
    if(user!==null)
   { if(user.isClient==true)
    {dispatch(getUserCases());}}
  }, [user]);
 
  
  const token = localStorage.getItem('token');
  const { loading, cases } = useSelector(
    (state) => state.caseReducer
  );
  const dispatch = useDispatch();
  
  //
  const onLoadMore = async () => {
    try {
      dispatch(loadMoreInit());
      const res = await axios.get("/admin/all_info", {
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (error) {
      message.error("server error");
      dispatch(cancelLoading());
    }
  };
  /*useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const res = await axios.get("/admin/all_info", {
            headers: {
              Authorization: `${token}`,
            },
          });
          dispatch(getUsers(res.data));
        } catch (error) {
          message.error("server error");
          dispatch(cancelInitLoading());
        }
      };
      getData();
    }
  }, [token, dispatch]);*/

  const loadMore =
     loading ? (
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
    <div style={{ height: "100%", padding: 20, marginTop: 100,width:'auto' }}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={cases}
        renderItem={(item) => (
          <List.Item
            style={{ backgroundColor: "white", margin: 20, borderRadius: 15 }}
            actions={[
              <span>Created on: {formatDate(item.created)}</span>,
           <Button
                type="primary"
                danger
                icon={<CloseCircleFilled />}
                onClick={() => {
                  dispatch(deleteCase(item._id))
                }}
              >
                Delete Case
              </Button>,
              item.isAccepted === true ? (
                <Button
                  type="primary"
                  icon={<WarningOutlined />}
                >
                  Accepted
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger
                  icon={<WarningOutlined />}
                  onClick={() => {
                    if (item.lawyerResponses[0]===user._id)
                    {dispatch(acceptCase(item._id))}
                  }}
                >
                  Accept case
                </Button>
              ),
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div style={{margin:'5px',width:'auto'}}>
              <List.Item.Meta
                avatar={<Avatar src={item.img_user} />}
                title={<span>From: {item.name_user}</span>}
              />
                <List.Item.Meta
                title={<span>To: {item.name_lawyer}</span>}
                avatar={<Avatar src={item.img_lawyer} />}
              />
              </div>
              <div style={{margin:'5px',maxWidth:'200px',overflowWrap:'break-word'}}>
                <span style={{ margin: 10 }}>description : {item.description}</span>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Cases;

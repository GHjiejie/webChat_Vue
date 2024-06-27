<template>
  <div class="aside">
    <div class="top">
      <div class="user_avatar">
        <img src="../../assets/images/pexels-photo-2531709.webp" alt="avatar" />
      </div>
      <div class="user_info">
        <span class="username">Jie</span>
        <span class="user_id">ID: 123456</span>
      </div>
    </div>
    <div class="center">
      <div class="messageList">
        <div class="messageItem" v-for="item in 50">
          <div class="message_user">
            <img
              src="../../assets/images/pexels-photo-3560044.webp"
              alt="avatar"
            />
          </div>
          <div class="message_info">
            <span class="message_username">Jack</span>
            <span class="message_content">Hello World</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
.aside {
  height: 100%;
  overflow: auto;
  border-right: 1px solid #413c3c67;

  .top {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 80px;
    background-color: black;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

    // overflow: hidden;
    .user_avatar {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 5px;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .user_info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #ccc;
      font-weight: bold;
      gap: 0.5rem;
      margin-left: 1rem;
      .username {
        font-size: 20px;
      }
      .user_id {
        font-size: 14px;
      }
    }
  }
  .center {
    flex: 1;
    overflow: auto;

    .messageList {
      display: flex;
      flex-direction: column;

      .messageItem {
        height: 4rem;
        border-bottom: 1px solid #f0f0f0;
        transition: all 0.3s;
        padding: 2.5rem 0.5rem;
        display: flex;
        align-items: center;

        .message_user {
          height: 100%;
          display: flex;
          align-items: center;
          img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        .message_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          margin-left: 1rem;
          .message_username {
            font-size: 16px;
          }
          .message_content {
            font-size: 14px;
          }
        }
        &:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      }
    }
  }
  .footer {
    height: 60px;
  }
}
</style>

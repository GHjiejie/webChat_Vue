<template>
  <div class="chatbox">
    <div class="box-left">
      <div class="top">
        <div class="convation_search">
          <input
            type="search"
            @keyup.enter="handleSearch"
            v-model="searchValue"
            placeholder="搜索会话"
          />
        </div>
      </div>
      <div class="center">
        <div class="conversationList">
          <div class="conversationItem" v-for="item in 10">
            <div class="conversation_user">
              <img
                src="../../assets/images/pexels-photo-3560044.webp"
                alt="avatar"
              />
            </div>
            <div class="conversation_info">
              <span class="conversation_username">Jack</span>
              <span class="conversation_content">Hello World</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <div class="box-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.chatbox {
  display: flex;
  // background-color: red;
  .box-left {
    width: 20%;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #ccc;
    .top {
      height: 10%;
      height: 10vh;
      border-bottom: 1px solid #ccc;
      position: sticky;
      top: 0;
      background-color: #f5f5f5;

      .convation_search {
        // width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 1rem;
        input {
          width: 60%;
          height: 5vh;
          border-radius: 1rem;
          border: none;
          outline: none;
          padding: 0 1rem;
          border: 1px solid #ccc;
          transition: all 0.3s ease-in-out;
          font-size: 1rem;
          &:hover {
            border: 1px solid rgba(0, 0, 0, 0.522);
          }
          &::placeholder {
            color: #ccc;
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
      }
    }
    .center {
      flex: 1;
      overflow: auto;

      .conversationList {
        display: flex;
        flex-direction: column;
        background-color: #e8e6e6;

        .conversationItem {
          height: 4rem;
          border-bottom: 1px solid #f5f5f5;
          transition: all 0.3s;
          padding: 2.5rem 0.5rem;
          display: flex;
          align-items: center;

          .conversation_user {
            height: 100%;
            display: flex;
            align-items: center;
            img {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .conversation_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            margin-left: 1rem;
            .conversation_username {
              font-size: 16px;
            }
            .conversation_content {
              font-size: 14px;
            }
          }
          &:hover {
            background-color: #c5c5c5;
            cursor: pointer;
          }
        }
      }
    }
    .footer {
      height: 10%;
    }
  }
  .box-right {
    width: 80%;
  }
}
</style>

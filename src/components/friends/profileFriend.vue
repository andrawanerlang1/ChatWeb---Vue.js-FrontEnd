<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>@{{ user[0].user_email }}</div>
      <div></div>
    </div>
    <div class="profileImage">
      <img
        v-if="!user[0].user_image"
        src="../../assets/icon/profilestock.jpg"
      />
      <img
        id="imageUploads"
        class="imgUpload"
        v-if="user[0].user_image && !url"
        :src="'http://localhost:3000/user/' + user[0].user_image"
      />
    </div>
    <div class="namePlate">
      <div>
        {{ user[0].user_name }}
      </div>
      <p>
        {{ user[0].user_email }}
      </p>
    </div>
    <div class="account">
      <br />
      <b> {{ user[0].user_name }}'s Account </b>
      <div class="phoneNumber">
        <div>Phone Number</div>
        <b> {{ user[0].user_number }} </b>
      </div>
      <div class="username">
        <b style="color:black"> {{ user[0].user_name }} </b>
        <div>Username</div>
      </div>
      <div class="username">
        <b style="color:black"> {{ user[0].user_bio }} </b>

        <div>Bio</div>
      </div>

      <div class="location">
        {{ user[0].user_name }}'s Account Location
        <GmapMap
          :center="coordinate"
          :zoom="10"
          map-type-id="terrain"
          class="gmap"
        >
          <GmapMarker
            :position="coordinate"
            icon="https://img.icons8.com/color/48/000000/map-pin.png"
          />
        </GmapMap>
        <b> Coordinate </b>
        <p>{{ user[0].user_lat }}, {{ user[0].user_lng }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      type: "watch",
      url: null,
      coordinate: {
        lat: -6.2399995,
        lng: 107.065767
      }
    };
  },
  created() {
    // this.setCoordinates();
  },
  computed: {
    ...mapGetters({
      user: "getterUserByIdFriend"
    })
  },
  methods: {
    ...mapGetters(["setUser"]),
    ...mapActions(["changeMode"]),
    goChat() {
      this.changeMode("chat");
    },
    setCoordinates() {
      this.coordinate.lat = this.user.user_lat;
      this.coordinate.lng = this.user.user_lng;
    }
  }
};
</script>

<style scoped>
.mainWrapper {
  padding: 20px;
  margin-bottom: 50px;
}
.topMenu {
  display: flex;
  justify-content: space-between;
  color: #7e98df;
  font-weight: bold;
  font-size: 23px;
}
.profileImage {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}

.profileImage img {
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  object-fit: cover;
  border: #7e98df 2px solid;
}
.profileImage img:hover {
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2), 0 10px 10px 0 rgba(0, 0, 0, 0.19);
}
.namePlate {
  text-align: center;
}
.namePlate div {
  font-size: 27px;
  font-weight: bold;
}
.phoneNumber,
.username {
  margin-top: 10px;
  border-bottom: rgb(206, 198, 198) 2px solid;
  padding-bottom: 20px;
  padding-top: 20px;
}
.location {
  margin-top: 15px;
  font-size: 22px;
  font-weight: bold;
  margin-right: 10px;
}
.location {
  font-size: 15px;
  font-weight: normal;
}
.gmap {
  width: 100%;
  height: 300px;
}
.username {
  color: grey;
}
.inputPhone,
.inputName {
  border: 0;
}
.inputName {
  color: black;
  font-weight: bold;
}
.buttonUpdate {
  margin-top: 20px;
  text-align: center;
}
.buttonUpdate button {
  background-color: white;
  border-radius: 10px;
  color: #7e98df;
  border: #7e98df 1px solid;
  font-weight: bold;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19);
}
.buttonUpdate button:hover {
  background-color: #7e98df;
  border: 0;
  color: white;
}
.setting {
  font-size: 22px;
  font-weight: bold;
  margin-top: 25px;
}
.changePassword {
  background-color: transparent;
  border: 0;
  margin-top: 40px;
  border-radius: 10px;
  padding: 10px;
}
.changePassword:hover {
  background-color: #7e98df;
  color: white;
}
</style>

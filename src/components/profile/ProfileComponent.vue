<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>@{{ user.user_email }}</div>
      <div></div>
    </div>
    <div class="profileImage" @click="chooseFile()">
      <img v-if="!user.user_image" src="../../assets/icon/profilestock.jpg" />
      <img
        id="imageUploads"
        class="imgUpload"
        v-if="user.user_image && !url"
        :src="'http://localhost:3000/user/' + user.user_image"
      />
      <img id="imageUpload" class="imgUpload" v-if="url" :src="url" />
      <input
        id="formInputImage"
        type="file"
        accept="image/x-png,image/jpg,image/jpeg"
        @change="handleFile"
        hidden
      />
    </div>
    <div class="namePlate">
      <div>
        {{ user.user_name }}
      </div>
      <p>
        {{ user.user_email }}
      </p>
    </div>
    <div class="account">
      <br />
      <b> Account </b>
      <div class="phoneNumber">
        Phone Number
        <b-form-input
          v-if="type === 'edit'"
          type="tel"
          class="inputPhone"
          v-model="user.user_number"
          placeholder="Input phone number"
        ></b-form-input>
        <div class="inputPhone" v-if="type === 'watch'">
          <b> {{ user.user_number }} </b>
        </div>
      </div>
      <div class="username">
        <b-form-input
          v-if="type === 'edit'"
          type="text"
          class="inputName"
          v-model="user.user_name"
          placeholder="Input Username"
        ></b-form-input>
        <div class="inputName" v-if="type === 'watch'">
          <b> {{ user.user_name }} </b>
        </div>
        Username
      </div>
      <div class="username">
        <b-form-input
          v-if="type === 'edit'"
          type="text"
          class="inputName"
          v-model="user.user_bio"
          placeholder="Input Biodata"
        ></b-form-input>
        <div class="inputName" v-if="type === 'watch'">
          <b> {{ user.user_bio }} </b>
        </div>
        Bio
      </div>

      <div class="buttonUpdate">
        <button v-if="type === 'watch'" @click="changeType('edit')">
          Edit Info
        </button>
      </div>
      <div class="buttonUpdate">
        <button v-if="type === 'edit'" @click="updateProfile">
          Save Changes
        </button>
      </div>
      <div class="location">
        My Location
        <GmapMap
          :center="coordinate"
          :zoom="10"
          map-type-id="terrain"
          class="gmap"
        >
          <GmapMarker
            :position="coordinate"
            :clickable="true"
            :draggable="true"
            @drag="dragMarker"
            @click="clickMarker"
            icon="https://img.icons8.com/color/48/000000/map-pin.png"
          />
        </GmapMap>
        <b> Click marker to update your coordinate </b>
        <p>My Coordinate :{{ user.user_lat }}, {{ user.user_lng }}</p>
      </div>
      <div class="setting">
        Settings
      </div>
      <button class="changePassword">
        <img
          src="../../assets/icon/lock.png"
          style="margin-right:10px"
          alt=""
        />
        Change Password
      </button>
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
        lat: 10,
        lng: 10
      }
    };
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        };
      })
      .catch(error => {
        alert(error);
      });
  },
  mounted() {
    this.getUserById();
  },
  computed: {
    ...mapGetters({
      user: "setUser"
    })
  },
  methods: {
    ...mapGetters(["setUser"]),
    ...mapActions(["changeMode", "getUserByIds", "updateUsers", "updateImage"]),

    handleFile(event) {
      const type = event.target.files[0].type;
      if (type != "image/jpeg" && type != "image/png" && type != "image/jpg") {
        return this.$toasted.error("Image must be JPG/PNG");
      } else {
        this.user.user_image = event.target.files[0];
        this.url = URL.createObjectURL(event.target.files[0]);
        this.updateImage(this.user)
          .then(result => {
            console.log(result);
            this.$toasted.success("Profile Image Updated");
          })
          .catch(error => {
            console.log(error);
            this.$toasted.error(error.data.msg);
          });
      }
    },
    chooseFile() {
      document.getElementById("formInputImage").click();
    },
    getUserById() {
      this.getUserByIds(this.user.user_id);
    },
    updateProfile() {
      if (!this.user.user_name) {
        return this.$toasted.error("Username cannot be empty");
      }
      const setData = {
        user_name: this.user.user_name,
        user_email: this.user.user_email,
        user_number: this.user.user_number,
        user_bio: this.user.user_bio
      };
      this.updateUsers(setData)
        .then(result => {
          this.$toasted.success(result.data.msg);
        })
        .catch(error => {
          this.$toasted.error(error.data.msg);
        });
      this.changeType("watch");
    },
    goChat() {
      this.changeMode("chat");
    },
    changeType(param) {
      this.type = param;
    },
    dragMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      };
    },
    clickMarker(position) {
      this.user.user_lat = position.latLng.lat();
      this.user.user_lng = position.latLng.lng();
      const setData = {
        user_lat: this.user.user_lat,
        user_lng: this.user.user_lng
      };
      this.updateUsers(setData)
        .then(result => {
          console.log(result);
          this.$toasted.success("Coordinate Updated");
        })
        .catch(error => {
          this.$toasted.error(error.data.msg);
        });
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

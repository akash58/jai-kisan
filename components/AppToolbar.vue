<template>
  <div>
    <v-toolbar
      color="primary"
      fixed
      dark
      app
    >
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="formDialogOpen">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-right="140" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-btn icon>
        <v-icon>help_outline</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="../static/avatar/man_2.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
                       @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
                       :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-dialog v-model="formDialog" persistent fullscreen transition="fade-transition">
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card-title>
            <span class="headline">Basic Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Father's Name" v-model="fatherName" required :rules="[v => !!v || 'Father Name is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Years in village" v-model="villageYears" required :rules="[v => !!v || 'Village Years is required']">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    label="Gender"
                    v-model="selectGender"
                    :items="gender"
                    :rules="[v => !!v || 'Gender is required']"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="PAN Number" v-model="panNumber" required 
                  :rules="[v => !!v || 'PAN Number is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Caste" v-model="caste" required :rules="[v => !!v || 'Caste is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="PAN Card" v-model="panCard" append-outer-icon="help_outline" required :rules="[v => !!v || 'PAN Card is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Family Type" v-model="familyType" required :rules="[v => !!v || 'Family Type is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Aadhar Number" v-model="aadharNumber" required :rules="[v => !!v || 'Aadhar Number is required']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    label="Village Size"
                    v-model="selectVillageSize"
                    :items="villageSize"
                    :rules="[v => !!v || 'Village Size is required']"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Aadhar Card" @click='pickAadharFile()' v-model='imageName' append-outer-icon="help_outline" required :rules="[v => !!v || 'Aadhar Card is required']"></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="/*"
                    @change="onFileAadharPicked"
                  >
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-select
                    label="House Ownership"
                    v-model="selectHouseOwnership"
                    :items="houseOwnership"
                    :rules="[v => !!v || 'House Ownership is required']"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="formDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import NotificationList from '@/components/widgets/list/NotificationList';
  import Util from '@/util';

  export default {
    name: 'app-toolbar',
    components: {
      NotificationList
    },
    data: () => ({
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: (e) => {
            this.$router.push('/')
          }
        }
      ],
      formDialog: false,
      selectGender: null,
      selectVillageSize: null,
      selectHouseOwnership: null,
      gender: [
        "Male",
        "Female",
        "Others",
      ],
      villageSize: [
        "0-100 Population",
        "100-500 Population",
        "500-1000 Population",
        "1000-2000 Population",
        "2000-3000 Population",
        "3000-4000 Population",
        "4000-5000 Population",
      ],
      houseOwnership: [
        "Yes",
        "No",
      ],
      imageName: '',
      imageFile: '',
      imageUrl: '',
      valid: true,
      fatherName: '',
      villageYears: '',
      panNumber: '',
      caste: '',
      panCard: '',
      familyType: '',
      aadharNumber: '',
    }),
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      formDialogOpen() {
        this.formDialog = true;
      },
      pickAadharFile () {
        this.$refs.image.click ()
      },
      onFileAadharPicked (e) {
        const files = e.target.files
        console.log(files[0].name);
        if(files[0] !== undefined) {
          this.imageName = files[0].name;
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },
      submit () {
        if (this.$refs.form.validate()) {
          console.log(this.fatherName);
          console.log(this.villageYears);
          console.log(this.panNumber);
          console.log(this.caste);
          console.log(this.panCard);
          console.log(this.familyType);
          console.log(this.aadharNumber);
          console.log(this.selectGender);
          console.log(this.selectVillageSize);
          console.log(this.selectHouseOwnership);
          console.log(this.imageName);
          this.formDialog = false;
        }
      }
    }
  };
</script>

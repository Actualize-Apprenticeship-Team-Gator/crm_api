/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      searchString: "",
      searchResults: [],
      // leadEvents: [],
      time_format: "12/25/17",
      url: "https://www.google.com/"
    },
    mounted: function() {
      $.get("/api/v1/leads.json").success(
        function(response) {
          this.leads = response.map(function(lead) {
            lead["showEvents"] = false;
            return lead;
          });
        }.bind(this)
      );
      this.searchResults = this.leads;
      console.log(this.leads);
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      expand: function(lead) {
        $.get("/api/v1/leads/" + lead.id + ".json").success(
          function(response) {
            this.leadEvents = response.events;
          }.bind(this)
        );
        lead.showEvents = !lead.showEvents;
      },
      searchFilter: function(inputLead) {
        return inputLead.first_name
          .toLowerCase()
          .includes(this.searchString.toLowerCase());
      }
    },
    computed: {}
  });
});

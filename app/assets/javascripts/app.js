/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
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
      }
    },
    computed: {}
  });
});

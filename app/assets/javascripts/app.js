/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      // leadEvents: [],
      time_format: "12/25/17",
      url: "https://www.google.com/",
      sortAttribute: "created_at",
      sortAscending: true
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
    },
    methods: {
      updateSortAttribute: function(sortAttribute) {
        if (this.sortAttribute == sortAttribute) {
          this.sortAscending = !this.sortAscending
        } else {
          this.sortAscending = true
          this.sortAttribute = sortAttribute
        }
      },
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
    computed: {
      sortedLeads: function() {
        return this.leads.sort((a, b) => {
          if (this.sortAscending) {
            return a[this.sortAttribute].localeCompare(b[this.sortAttribute])
          } else {
            return b[this.sortAttribute].localeCompare(a[this.sortAttribute])
          }
        });
      }
    }
  });
});

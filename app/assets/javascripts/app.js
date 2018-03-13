/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      searchString: "",
      searchResults: [],
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
          this.sortAscending = !this.sortAscending;
        } else {
          this.sortAscending = true;
          this.sortAttribute = sortAttribute;
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
      },
      searchFilter: function(lead) {
        return (
          lead.first_name
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          lead.last_name
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          lead.email.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
    },
    computed: {
      sortedLeads: function() {
        return this.leads.sort((a, b) => {
          if (this.sortAscending) {
            return a[this.sortAttribute].localeCompare(b[this.sortAttribute]);
          } else {
            return b[this.sortAttribute].localeCompare(a[this.sortAttribute]);
          }
        });
      }
    }
  });
});

const dashboardModel = require("../models/dashboardModel");

const getLatestEvents = (req, res) => {
  dashboardModel.getLatestEvents((err, events) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching latest events" });
    }
    res.status(200).json(events);
  });
};

module.exports = { getLatestEvents };

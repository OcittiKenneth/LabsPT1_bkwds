import React, { Fragment } from "react"
import { DateRangePicker } from "react-dates"

import * as s from "../../../styles/CreateTripPanel.styles"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "../createTrip/custom.css"

class CreateTripPanel extends React.Component {
  state = {
    title: "",
    startDate: null,
    endDate: null,
    focusedInput: null,
    location: "",
    isToggled: false
  }

  toggleDropdown = () => {
    this.setState({ isToggled: !this.state.isToggled })
  }

  handleLocation = event => {
    this.setState({ location: event.target.value })
    this.searchAutoComplete()
  }

  searchAutoComplete = () => {
    const input = document.getElementById("mapSearch")
    const autoComplete = new window.google.maps.places.Autocomplete(input)
    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace()
      if (place.geometry !== undefined) {
        window.map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
  }

  handleTitle = e => {
    e.persist()
    this.setState({ title: e.target.value }, () => {
      this.props.getTitle(e.target.value)
    })
  }

  handleDate = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => {
      this.props.getDates({ startDate, endDate })
    })
  }

  render() {
    return (
      <Fragment>
        <s.Panel isToggled={this.state.isToggled}>
          <s.PanelHeader>Create Your Trip</s.PanelHeader>
          <s.InputLabel>Location</s.InputLabel>
          <s.SearchCenterInput
            id="mapSearch"
            placeholder="Enter Location OR drag map"
            value={this.state.location}
            onChange={this.handleLocation}
          />

          <s.TripTitleInput
            isToggled={this.state.isToggled}
            placeholder="Trip Name"
            onChange={this.handleTitle}
            value={this.state.title}
          />

          <s.DateLabel>Trip Date</s.DateLabel>
          <s.DateRangeStyle isToggled={this.state.isToggled}>
            <DateRangePicker
              numberOfMonths={1}
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate}
              horizontalMargin={5}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => {
                this.handleDate({ startDate, endDate })
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput })
              }}
            />
          </s.DateRangeStyle>

          <s.ButtonGroup isToggled={this.state.isToggled}>
            <s.WaypointButton onClick={this.props.addWaypoint}>
              + Waypoint
            </s.WaypointButton>
            <s.SaveButton
              isToggled={this.state.isToggled}
              onClick={() => this.props.saveTrip()}
            >
              Create Trip
            </s.SaveButton>
          </s.ButtonGroup>
          <s.Toggle>
            <i
              id="down-angle"
              className="fas fa-angle-down fa-2x"
              onClick={this.toggleDropdown}
            />
          </s.Toggle>
        </s.Panel>
      </Fragment>
    )
  }
}

export default CreateTripPanel

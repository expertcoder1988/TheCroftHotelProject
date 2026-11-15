$(document).ready(function () {
    if ($('#AvoidReload').val() != "True") {
        // alert("g");
        $("#dvmeals").hide();
        $("#numberofdays").hide();
        const today = moment();
     //   console.log(today.format("YYYY/MM/DD"));
      //  $("#txtCheckOut").val(today.add(30, 'days'));
     //  $("#txtCheckIn").val(today.format("MM/DD/YYYY"));
        document.getElementById('txtCheckIn').value = today.add(-15, 'days').format("YYYY-MM-DD");
        document.getElementById('txtCheckOut').value = today.add(30, 'days').format("YYYY-MM-DD");
        LoadCategories();
    }

    $(function () {
        try {
            $.ajax({
                url: '/Property/Properties',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    // console.log(data);
                    $('#AvoidReload').val("True");
                    //  alert("f");
                    //var ddlPropertyTypes = $("[id*=PropertyTypes]");
                    $('#Properties').empty().append('<option selected="selected" value="0">Please select</option>');
                    //if (data.length > 0) {

                    $.each(data, function (i, item) {
                        $('#Properties').append($('<option></option>').attr('value', item.Id).text(item.PropertyName));
                    });
                    $("select#Properties").prop('selectedIndex', 1);
                    //document.getElementById('#Properties').selectedIndex = 1;
                    loadBooking();
                    //}
                },
                error: function (err) {
                    //  alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            window.location.href = '/Property/Index';
        }
    })

    function LoadCategories() {
        try {
            $.ajax({
                url: '/Property/LoadCategories',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {

                    $('#RoomCategory').empty().append('<option selected="selected" value="-1">All</option>');
                    //if (data.length > 0) {

                    $.each(data, function (i, item) {
                        $('#RoomCategory').append($('<option></option>').attr('value', item.CateId).text(item.Category));
                    });
                    //document.getElementById('#PropertyTypes').selectedIndex = 1;
                    //}
                },
                error: function (err) {
                    //  alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            window.location.href = '/Property/Index';
        }
    }

    function loadBooking() {
        try {
            if ($("#Properties")[0].selectedIndex == 0) {
                alert("Please select a Property");
                return;
            }
            var propertyID = new Object();
            propertyID = $('#Properties').val();

            var _txtCheckIn = new Object();
            _txtCheckIn = $('#txtCheckIn').val();

            var _txtCheckOut = new Object();
            _txtCheckOut = $('#txtCheckOut').val();

            var _BookingStatus = new Object();
            _BookingStatus = $('#BookingStatus').val();

            var roomCate = new Object();
            roomCate = $('#RoomCategory').val();

            $.ajax({
                url: '/Booking/BookingList',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: 'propertyID=' + propertyID + '&CheckIn=' + _txtCheckIn + '&CheckOut=' + _txtCheckOut + '&BookingStatus=' + _BookingStatus + '&Roomcate=' + roomCate,
                success: function (data) {
                    //console.log(data);
                    $("#bookings").empty();
                    var trHTML = '';
                    trHTML = '<thead><tr><th>Booking ID</th><th>Customer Name</th><th>Mobile No.</th><th>Room Category</th><th>Res. Date </th><th>CheckIn</th><th>CheckOut</th><th>Adults</th>' +
                            '<th>Children</th><th>No Of Rooms</th><th>Amount Paid</th><th></th><th></th></tr></thead>';
                    if (data.length > 0) {
                      //  console.log(data);
                        trHTML += '<tbody>';
                        $.each(data, function (i, item) {
                            var sDate = moment(item.CheckIn); //new Date(parseInt(item.StartDate.substr(6)));
                            var eDate = moment(item.CheckOut);
                            var rDate = moment(item.ReservationDate);
                           
                            var _CheckIn = "CheckIn";

                            if (item.status == "CheckIn") {
                                _CheckIn = "CheckOut";
                            }
                            
                            if (sDate.format('LL') == moment().format('LL')) {
                                
                                trHTML += '<tr style="color:red"><td>' + item.BookingID + '</td><td>' + item.PaxFName + '</td>' +
                                    '<td>' + item.PaxPhoneNumber + '</td><td>' + item.RoomCategory + '</td>' +
                                    '<td>' + rDate.format('DD-MM-YYYY')  + '</td><td>' + sDate.format('DD-MM-YYYY') + '</td>' +
                                    '<td>' + eDate.format('DD-MM-YYYY') + '</td><td>' + item.Adults + '</td>' +
                                    '<td>' + item.Children + '</td><td>' + item.NoOfRooms + '</td><td>' + item.Rate + '</td>'
                                    "<td><input type='button' ID='" + item.BookingID + "' class='CheckIn btn btn-primary' value='" + _CheckIn + "' /></td>" +
                                    "<td><input type='button' ID='" + item.BookingID + "' class='ChangeRoom btn btn-info' value='Change Room' /></td>";
                                if (item.status == "Paid") {
                                    trHTML += "<td><input type='button' disabled ID='Paid_" + item.BookingID + "' class='Paid btn btn-success' value='Paid' /></td></tr>";
                                }
                                else {
                                    trHTML += "<td><input type='button' ID='Paid_" + item.BookingID + "' class='Paid btn btn-success' value='Paid' /></td></tr>";
                                }
                            }
                            else {
                                trHTML += '<tr><td>' + item.BookingID + '</td><td>' + item.PaxFName + '</td>' +
                                    '<td>' + item.PaxPhoneNumber + '</td><td>' + item.RoomCategory + '</td>' +
                                    '<td>' + rDate.format('DD-MM-YYYY')  + '</td><td>' + sDate.format('DD-MM-YYYY') + '</td>' +
                                    '<td>' + eDate.format('DD-MM-YYYY') + '</td><td>' + item.Adults + '</td>' +
                                    '<td>' + item.Children + '</td><td>' + item.NoOfRooms + '</td><td>' + item.Rate+'</td>'+
                                    "<td><input type='button' ID='" + item.BookingID + "' class='CheckIn btn btn-primary' value='" + _CheckIn + "' /></td>" +
                                    "<td><input type='button' ID='" + item.BookingID + "' class='ChangeRoom btn btn-info' value='Change Room' /></td>";
                                if (item.status == "Paid") {
                                    trHTML += "<td><input type='button' disabled ID='Paid_" + item.BookingID + "' class='Paid btn btn-success' value='Paid' /></td></tr>";
                                }
                                else {
                                    trHTML += "<td><input type='button' ID='Paid_" + item.BookingID + "' class='Paid btn btn-success' value='Paid' /></td></tr>";
                                }
                            }
                            
                        });
                        trHTML += '</tbody>';
                        $('#bookings').append(trHTML);
                    }
                },
                error: function (err) {
                    alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            alert(e.status + " : " + e.statusText);
            window.location.href = '/Booking/BookingList';
        }
    }


    //$('#Properties').change(function () {
    //    loadBooking();
    //});

    $("table").on("click", ".ChangeRoom", function (ev) {
        // ev.preventDefault();
        $('#ChangeRoomModal').modal('show');

        var id = this.id;
        LoadRoomNums(id);
        $('#BookingID').val(id);
    });

    function LoadRoomNums(id) {
        try {

            $.ajax({
                url: '/Booking/LoadRoomNumsCheckin',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: 'bookingId=' + id,
                success: function (data) {
                    // console.log(data);
                    $('#RoomNum').empty().append('<option selected="selected" value="-1">Please Select</option>');
                    //if (data.length > 0) {

                    $.each(data, function (i, item) {
                        $('#RoomNum').append($('<option></option>').attr('value', item.RoomNums).text(item.RoomNums));
                    });
                    //document.getElementById('#PropertyTypes').selectedIndex = 1;
                    //}
                },
                error: function (err) {
                    //  alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            alert(e);
            window.location.href = '/Booking/Booking';
        }
    }

    $('#closePic').click(function () {
        $('#ChangeRoomModal').modal('hide');
    })

    $('#Save').click(function () {
        UpdateRoomNum();
        $('#ChangeRoomModal').modal('hide');
    })

    function UpdateRoomNum() {
        try {

            $.ajax({
                url: '/Booking/UpdateRoomNum',
                type: 'POST',
                dataType: 'json',
                data: 'bookingId=' + $('#BookingID').val() + '&RoomNum=' + $('#RoomNum').val(),
                success: function (data) {
                    // console.log(data);
                    alert("Room changed successfully.");
                    loadBooking();
                },
                error: function (err) {
                    //  alert(err.status + " : " + err.statusText);
                    alert("Room changed successfully.");
                    loadBooking();
                }

            });
        } catch (e) {
            alert(e);
            window.location.href = '/Booking/Index';
        }
    }

    $('#showlist').click(function () {
        loadBooking();
    })

    $("table").on("click", ".CheckIn", function (ev) {
        // ev.preventDefault();
        var id = this.id;
        var text = $(this).attr('value');

        if (text == "CheckIn") {
            if (confirm("Are you sure to CheckIn?")) {
                CheckIn(id, "CheckedIn");
            }
            else {
                return false;
            }
        }
        else {
            if (confirm("Are you sure to Checkout?")) {
                CheckIn(id, "CheckOut");
            }
            else {
                return false;
            }
        }
    });

    function CheckIn(id, text) {

        try {

            $.ajax({
                url: '/Booking/CheckIn/',
                type: 'POST',
                dataType: 'json',
                data: 'bookingID=' + id + "&Status=" + text,
                //contentType: 'application/json',
                success: function (data) {
                    alert("CheckIn done successfully.");
                    loadBooking();
                },
                error: function (err) {
                    alert("CheckOut done successfully.");
                    loadBooking();
                    //  alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            window.location.href = '/Booking/Index';
        }
    }

    $("table").on("click", ".Paid", function (ev) {
        // ev.preventDefault();
        var id = this.id;
        id = id.split('_');
        id = id[1];
        var text = $(this).attr('value');

        if (text == "Paid") {
            if (confirm("Please confirm payment.?")) {
                Payment(id, "Paid");
            }
            else {
                return false;
            }
        }
      
    });

    function Payment(id, text) {

        try {
            $.ajax({
                url: '/Booking/Payment/',
                type: 'POST',
                dataType: 'json',
                data: 'bookingID=' + id + "&Status=" + text,
                //contentType: 'application/json',
                success: function (data) {
                    alert("Payment saved successfully.");
                    loadBooking();
                },
                error: function (err) {
                    alert("Payment saved successfully.");
                    loadBooking();
                    //  alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            window.location.href = '/Booking/Index';
        }
    }
});
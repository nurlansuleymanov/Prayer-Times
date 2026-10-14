$(document).ready(function () {


    let latitude = 40.4093;

    let longitude = 49.8671;



    $("#searchBtn").click(function () {


        let selectedDate = $("#dateInput").val();



        if (selectedDate == "") {

            alert("Please select date");

            return;

        }



        let date = new Date(selectedDate);



        let year = date.getFullYear();

        let month = date.getMonth() + 1;

        let day = date.getDate();


        let api =
            `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=2`;

        $("#loading").show();

        $.ajax({

            url: api,

            method: "GET",

            success: function (response) {


                $("#loading").hide();


                let timings = response.data.timings;


                $("#fajr").text(
                    timings.Fajr.substring(0, 5)
                );


                $("#sunrise").text(
                    timings.Sunrise.substring(0, 5)
                );


                $("#dhuhr").text(
                    timings.Dhuhr.substring(0, 5)
                );


                $("#asr").text(
                    timings.Asr.substring(0, 5)
                );


                $("#maghrib").text(
                    timings.Maghrib.substring(0, 5)
                );


                $("#isha").text(
                    timings.Isha.substring(0, 5)
                );


            },


            error: function (error) {


                $("#loading").hide();


                alert("Something went wrong. Please try again.");


                console.log(error);


            }


        });


    });


    $("#dailyBtn").click(function () {


        $("#dailyView").show();


        $("#monthlyView").hide();

    });


    $("#monthlyBtn").click(function () {


        $("#dailyView").hide();


        $("#monthlyView").show();


    });


    $("#monthSearchBtn").click(function () {

        let selectedMonth = $("#monthInput").val();


        if (selectedMonth == "") {


            alert("Please select month");


            return;

        }


        let date = new Date(selectedMonth);


        let year = date.getFullYear();


        let month = date.getMonth() + 1;


        let api =
            `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`;



        $("#loading").show();


        $.ajax({


            url: api,


            method: "GET",


            success: function (response) {


                $("#loading").hide();


                let days = response.data;


                let table = "";


                days.forEach(function (day) {


                    table += `

                    <tr>


                    <td>
                    ${day.date.gregorian.date}
                    </td>


                    <td>
                    ${day.timings.Fajr.substring(0, 5)}
                    </td>


                    <td>
                    ${day.timings.Sunrise.substring(0, 5)}
                    </td>


                    <td>
                    ${day.timings.Dhuhr.substring(0, 5)}
                    </td>


                    <td>
                    ${day.timings.Asr.substring(0, 5)}
                    </td>


                    <td>
                    ${day.timings.Maghrib.substring(0, 5)}
                    </td>


                    <td>
                    ${day.timings.Isha.substring(0, 5)}
                    </td>


                    </tr>

                    `;

                });


                $("#monthTable").html(table);

            },

            error: function (error) {


                $("#loading").hide();


                alert("Cannot load monthly data");


                console.log(error);

            }


        });


    });


});
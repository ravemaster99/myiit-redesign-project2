$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
(function($) {
  $(document).ready(
    function() {
      var userName = "David Wong";
      var classList = 
        [{classCode:"ITMD-361",
          className:"Fundamentals of Web Development", 
          level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-411",
            className:"Inermediate Software Development", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-421",
            className:"Data Modeling and Appication", 
            level:"CE", grade:"B", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-460",
            className:"Fundamentals of Multimedia", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-462",
            className:"Web Site Application Development", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3}];
      var term = "noTerm";

      $('.user-name').html('Welcome '+userName);
      
      if ($('#select-term').children().length <= 0) {
        fillTermOpt();
      }
      
      $('#select-term').on('change', function() {
        term = $('#select-term').val();
        if (term !== "noTerm") {
          fillStrEndDate();

          $('#slct-term').addClass('hide');
          $('#std-info-head').addClass('trans-info-head');
          $('#cur-info-head').addClass('trans-info-head');
          $('#cls-info-head').addClass('trans-info-head');
          displayTranscript();
        }
      });
      
      $('#ofc-tsc-btn').on('click', function() {
        $('#ofc-tsc-popup').toggle();
      });
            
      $('.close').on('click', function() {
        $('#ofc-tsc-popup').toggle();
      });
  
      $('#transcript-link').on('click', function() {
        document.location.href = '../transcript/index.html';
      });
      
      $('#home-btn').on('click', function() {
        document.location.href = '../main/index.html';
      });
      
      $('#new-term-btn').on('click', function() {
        location.reload();
      });
      
      $('#navAcademic').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c1');
      });
      
      $('#navFinance').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c2');
      });
      
      $('#navActivities').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c3');
      });
      
      $('#navAdvisor').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c4');
      });
      
      $('#navLinks').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c5');
      });
      
      $('.navback').on('click', function(e) {
        e.stopPropagation();
        $('#nav').removeClass('c1');
        $('#nav').removeClass('c2');
        $('#nav').removeClass('c3');
        $('#nav').removeClass('c4');
        $('#nav').removeClass('c5');
      });
      
      $('#logoutBtn').on('click', function() {
        document.location.href = '../index.html';
      });
      
      function fillStrEndDate() {
        var selYear = "";
        var selSemester = "";
        var pattern = /(Spring|Summer|Fall).+(\d{4})/;
        var matched = null;
        var sDate = "";
        var eDate = "";
        var nextYear;
        var i = 0;
        
        matched = term.match(pattern);
        if(matched) {
          selYear = matched[2];
          selSemester = matched[1]; 
        } else if ((matched = term.match(/(\d{4}).+Professional Learning/))) {
          selYear = matched[1];
          selSemester = "PL";
        }         
          
        switch(selSemester) {
        case "Spring" : 
          sDate = "Feb 20, " + selYear;
          eDate = "May 15, " + selYear;
          
          break;
        case "Summer" :
          sDate = "Jun 12, " + selYear;
          eDate = "Aug 3, " + selYear;                
          break;
        case "Fall" :
        case "PL" :
          sDate = "Aug 20, " + selYear;
          nextYear = Number(selYear)+1;
          eDate = "Jan 25, " + nextYear;
          break;    
        }
          
        for ( i=0; i<classList.length; i++) {
          classList[i].startDate = sDate;
          classList[i].endDate = eDate;
        }
      }  // fillStrEndDate()
        
      function displayTranscript() {
        // This block of data should be obtained from database
        var txt = "";
        var name = userName;
        var dob = "May 20, 1998";
        var type = "undergraduate";
        var program = "Bachelor Degree";
        var college = "School of Applied Technology";
        var major = "Applied Technology";
        var cd = "";
        var cn = "";
        var sd = "";
        var ed = "";
        var crd = "";
        var grd = "";
        var i = 0;
        
        txt = term + ' Transcript';
        $('#transcript-title').html(txt);
        
        txt = "STUDENT INFORMATION";
        $('#std-info-head').html(txt);
        
        txt = '<p>Name : '  + name + '</p>';
        $('#student-info').append(txt);
        
        txt = '<p>Date of birth : '  + dob + '</p>';
        $('#student-info').append(txt);
        
        txt = '<p>Student type : '  + type + '</p>';
        $('#student-info').append(txt);
        
        txt = "CURRICULUM INFORMATION";
        $('#cur-info-head').html(txt);
 
        txt = '<p>Program : '  + program + '</p>';
        $('#curr-info').append(txt); 
        
        txt = '<p>College : '  + college + '</p>';
        $('#curr-info').append(txt);    
        
        txt = '<p>Major : '  + major + '</p>';
        $('#curr-info').append(txt); 
         
        txt = "COURSES";
        $('#cls-info-head').html(txt); 
        
        // build table header
        txt = '<table id="cls-tbl" border="1" align="center"><tr><th>Class Code</th><th>Class Name</th><th>Start Date </th><th>End Date</th><th>Credit</th><th>Grade</th></tr></table>';
        $('#class-list').append(txt);
        for (i=0; i<classList.length; i++) {
          cd = classList[i].classCode;
          cn = classList[i].className;
          sd = classList[i].startDate;
          ed = classList[i].endDate;
          crd = classList[i].credit;
          grd = classList[i].grade;
          txt = '<tr><td>'+cd+'</td><td>'+cn+'</td><td>'+sd+'</td><td>'+ed+'</td><td>'+crd+'</td><td>'+grd+'</td></tr>';
          $('#cls-tbl').append(txt);
        }
      }  // displayTranscript()
      
      /* 
        Function to fill the term selection options.
      */
      function fillTermOpt() {
        var numOfYears = 10;
        var currYear = (new Date()).getFullYear();
        var i = 0;
        var termText = "";
        
        $('#select-term').append('<option value="noTerm" selected>Select a term</option>');
        
        for (i=0; i<numOfYears; i++) {
          termText = 'Spring ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = 'Summer ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = 'Fall ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = currYear + ' Professional Learning';
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          currYear--;
        }
      }

    })
})(jQuery);

function login(form){
  if(form.username.value === "") {
    alert("Error: Username cannot be blank!");
    form.username.focus();
    return false;
  }

  if(form.pwd.value !== "") {
    if(form.pwd.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      form.pwd.focus();
      return false;
    }

  } else {
    alert("Error: Password cannot be blank!");
    form.pwd.focus();
    return false;
  }
  
  
  window.location = "main/index.html";
  return false;
}

function menu( menuform ){
  selecteditem = menuform.url.selectedIndex;
  newurl = menuform.url.options[ selecteditem ].value;
  if (newurl.length !== 0) {
    location.href = newurl;
  }
}

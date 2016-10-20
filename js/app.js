// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

  /* ---------------------------------- Local Variables ---------------------------------- */
  var service = new EmployeeService();
  HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
  EmployeeListView.prototype.template = 
              Handlebars.compile($("#employee-list-tpl").html());
  EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());

  service.initialize().done(function () {
    router.addRoute('', function() {
        $('body').html(new HomeView(service).render().$el);
    });

    router.addRoute('employees/:id', function(id) {
        service.findById(parseInt(id)).done(function(employee) {
            $('body').html(new EmployeeView(employee).render().$el);
        });
    });

    router.start();
  });

  /* --------------------------------- Event Registration -------------------------------- */
  
  /*  $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function() {
      alert("Employee Directory v3.4");
    });*/

  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body); //eliminar los 300ms de carga de los alerts
  }, false);

  /* ---------------------------------- Local Functions ---------------------------------- */
  function findByName() {
    service.findByName($('.search-key').val()).done(function (employees) {
      /*var l = employees.length;
      var e;
      $('.employee-list').empty();
      for (var i = 0; i < l; i++) {
        e = employees[i];
        $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
      }*/
      $(".content").html(employeeListTpl(employees));
    });
  };

  function renderHomeView() {
    $('body').html(homeTpl());
    $('.search-key').on('keyup', findByName);
  };

}());
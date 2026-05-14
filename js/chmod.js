$(document).ready(function () {
  function calculatePermissions() {
    let permissions = {
      owner: 0,
      group: 0,
      public: 0,
    };
    let symbolic = {
      owner: "",
      group: "",
      public: "",
    };

    $(".permission").each(function () {
      let group = $(this).data("group");
      let perm = parseInt($(this).data("perm"));

      if ($(this).is(":checked")) {
        permissions[group] += perm;
        symbolic[group] += perm === 4 ? "r" : perm === 2 ? "w" : "x";
      } else {
        symbolic[group] += "-";
      }
    });

    $("#numeric-permissions").val(
      `${permissions.owner}${permissions.group}${permissions.public}`
    );
    $("#symbolic-permissions").val(
      `${symbolic.owner}${symbolic.group}${symbolic.public}`
    );
  }

  $(".permission").change(calculatePermissions);

});

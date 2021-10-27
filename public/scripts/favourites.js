const favouriteShoesCookie = "favouriteShoes"

function favourite(element, shoe_id) {
  const favouriteClass = "fas";
  let ele = document.getElementById(element.id);

  ele.classList.toggle("far");
  ele.classList.toggle(favouriteClass);

  let cookie = getCookie(favouriteShoesCookie);
  let shoesArr = cookie != "" ? JSON.parse(cookie) : [];

  if (ele.classList.contains(favouriteClass)) {
    // Add shoe to favourite shoes cookie
    shoesArr.push(shoe_id);
  } else {
    // Remove from favourite shoes cookie
    let index = shoesArr.indexOf(shoe_id);
    if (index != -1) {
      shoesArr.splice(index, 1);
    }
  }

  setCookie(favouriteShoesCookie, JSON.stringify(shoesArr));
}

function checkFavouriteShoesCookie() {
  let favouriteShoes = getCookie(favouriteShoesCookie);
  if (!favouriteShoes) return
  let shoesArr = JSON.parse(favouriteShoes);

  shoesArr.forEach(shoeId => {
    let ele = document.getElementById("heart-"+shoeId);
    ele.classList.toggle("fas");
    ele.classList.toggle("far");
  })
}

function setCookie(cname, cvalue) {
  const d = new Date();
  // Cookie lasts 24 hours
  d.setTime(d.getTime() + (24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = checkFavouriteShoesCookie;

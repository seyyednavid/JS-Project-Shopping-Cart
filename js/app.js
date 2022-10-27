// variables
// reach to all courses' section
const courses = document.querySelector("#all-courses");
// reach to tbody in table
const shoppingCartContent = document.querySelector("#shopping-cart tbody");
// reach to clear-all-courses button
const shoppingCartRemoveBtn = document.querySelector("#clear-cart");

// eventListeners
eventListeners();
function eventListeners() {
  //  event after the click on add to basket
  courses.addEventListener("click", buyCourse);
  //  remove the course from cart
  shoppingCartContent.addEventListener("click", removeCourse);
  // remove all courses from clear all course button
  shoppingCartRemoveBtn.addEventListener("click", removeCourseBtn);
  // fetch corses from local storage to shopping cart on loaded
  document.addEventListener("DOMContentLoaded", getCourseOnLoad);
}

// function buy a course
function buyCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-basket")) {
    // if exist get selected course
    const course = e.target.parentElement.parentElement;
    //  function for getting information from selected course in detail
    getCourseInfo(course);
  }
}

//  function for getting information from selected course in detail
function getCourseInfo(course) {
  const courseInfo = {
    image: course.querySelector("img").src,
    courseTitle: course.querySelector("h4").textContent,
    price: course.querySelector("span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };
  //  adding feature of selected courses to cart
  addToCart(courseInfo);
}

//  adding feature of selected courses to cart
function addToCart(cInfo) {
  // create a tr tag
  const tableRow = document.createElement("tr");
  // give value to array
  tableRow.innerHTML = `
            <tr>
                <td><img src="${cInfo.image}"  width="40px"></td>
                <td>${cInfo.courseTitle}</td>
                <td>${cInfo.price}</td>
                <td>
                    <a class="remove" href="#" data-id= "${cInfo.id}" >X</a>
                </td>
            </tr> 
            `;

  // adding a new row to table
  shoppingCartContent.appendChild(tableRow);
  //  add to local storage
  addToLocalStorage(cInfo);
}

//  adding course to local storage
function addToLocalStorage(course) {
  // get list of courses from local storage
  let coursesLS = getCourseFromLS();
  //  add new course to array classes
  coursesLS.push(course);
  //  change array to string for storing in local storage
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

// getting course from local storage on load
function getCourseOnLoad() {
  // get list of courses from local storage
  let coursesLS = getCourseFromLS();
  coursesLS.forEach(function (cInfo) {
    // create a tr tag
    const tableRow = document.createElement("tr");
    // give value to tr
    tableRow.innerHTML = `
        <tr>
            <td><img src="${cInfo.image}"  width="40px"></td>
            <td>${cInfo.courseTitle}</td>
            <td>${cInfo.price}</td>
            <td>
                <a class="remove" href="#" data-id= "${cInfo.id}" >X</a>
            </td>
        </tr> 
        `;
    // adding a new row to table
    shoppingCartContent.appendChild(tableRow);
  });
}

//  remove course from shopping cart
function removeCourse(e) {
  let courseId;
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    //  get id  related to deleted course
    courseId = e.target.getAttribute("data-id");
  }
  // remove course from local storage
  removeCourseFromLS(courseId);
}

//  remove course from local storage
function removeCourseFromLS(id) {
  // get list of courses from local storage
  let coursesLS = getCourseFromLS();
  coursesLS.forEach(function (course, index) {
    // if sended id from shopping cart is equal to course id in local storage
    if (course.id === id) {
      //  remove course from array
      coursesLS.splice(index, 1);
    }
  });
  //   set new array to local storage
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

//  remove all courses of shopping cart by clear-all-course button
function removeCourseBtn(e) {
  while (shoppingCartContent.firstChild) {
    // while there is first child remove it
    shoppingCartContent.firstChild.remove();
  }
  //  remove all courses from local storage
  removeCoursesAllFromLS();
}

//  remove all courses from local storage by clear-all-course button
function removeCoursesAllFromLS() {
  // clear local storage
  localStorage.clear();
}

//  check available courses in local storage
function getCourseFromLS() {
  let courses;
  if (localStorage.getItem("courses") === null) {
    // if not exist
    courses = [];
  } else {
    // if exist
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}

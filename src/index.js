window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

// كود من بوستراب ل اظهار  tooltip
// const tooltipTriggerList = document.querySelectorAll(
//   '[data-bs-toggle="tooltip"]'
// );
// const tooltipList = [...tooltipTriggerList].map(
//   (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
// );

//كود مختصر
document
  .querySelectorAll('[data-bs-toggle="tooltip"]')
  .forEach((item) => new bootstrap.Tooltip(item));

document.querySelectorAll(".add-to-cart-btn").forEach((item) => {
  item.addEventListener("click", () => {
    alert("تم اضافة المنتج الى العربة");
  });
});

document
  .querySelectorAll('.size-option input[type="radio"]')
  .forEach((item) => {
    item.addEventListener("change", () => {
      document.querySelectorAll(".size-option").forEach((i) => {
        i.classList.remove("active");
      });
      item.parentNode.parentNode.classList.add("active");
    });
  });

document
  .querySelectorAll('.color-option input[type="radio"]')
  .forEach((item) => {
    item.addEventListener("change", () => {
      document.querySelectorAll(".color-option").forEach((i) => {
        i.classList.remove("active");
      });
      item.parentNode.parentNode.classList.add("active");
    });
  });

// حساب اجمالي المنتج
document.querySelectorAll("[data-product-quantity]").forEach((item) => {
  item.addEventListener("change", () => {
    const newQuantity = item.value;
    const parent = item.closest("[data-product-info]");
    const pricePerUnit = parent.getAttribute("data-product-price");
    const totalPriceForProduct = newQuantity * pricePerUnit;
    parent.querySelector(".total-price-for-product").innerHTML =
      totalPriceForProduct + " $";

    // تحديث السعر الكلي
    calulateTotalPrice();
  });
});

document.querySelectorAll("[data-remove-from-card]").forEach((item) => {
  item.addEventListener("click", () => {
    item.closest("[data-product-info]").remove();
    // تحديث السعر الكلي
    calulateTotalPrice();
  });
});

function calulateTotalPrice() {
  // تحديث السعر الكلي
  let totalPriceAllProducts = 0;
  document.querySelectorAll("[data-product-info]").forEach((item) => {
    const pricePerUnit = item.getAttribute("data-product-price");
    const quantity = item.querySelector("[data-product-quantity]").value;
    const totalPriceForProduct = pricePerUnit * quantity;
    totalPriceAllProducts += totalPriceForProduct;
  });
  document.getElementById("total-price-for-all-product").innerHTML =
    totalPriceAllProducts + " $";
}


const citiesByCountry = {
  ye : ["صنعاء", "عدن", "حضرموت"],
  sa: ["الرياض", "جدة", "الدمام"],
  eg: ["القاهرة", "الإسكندرية", "الجيزة"],
  uae: ["دبي", "أبو ظبي", "الشارقة"],
  kuw: ["مدينة الكويت", "الجهراء", "الفروانية"],
  qat: ["الدوحة", "الريان", "الوكرة"],

}

document.querySelectorAll('select[name="country"]').forEach((item) => {
  item.addEventListener("change", () => {
    const country = item.value;
    const cities = citiesByCountry[country];


    document.querySelectorAll('#payment-cities option').forEach((option) => option.remove());
    
    const firstOption = document.createElement('option')
    const optionText = document.createTextNode('اختر المدينة')
    firstOption.appendChild(optionText)
    firstOption.setAttribute('value','')
    firstOption.setAttribute('disabled','true')
    firstOption.setAttribute('selected','true')


    const city_option = document.getElementById("payment-cities")
    city_option.appendChild(firstOption)

    cities.forEach((city) => {
      const newOption = document.createElement("option");
      const optionText = document.createTextNode(city);
      newOption.appendChild(optionText);
      newOption.setAttribute("value", city);
      city_option.appendChild(newOption);
    });

   })

})

// اخفاء و اظهار حقول ادخال بطاقة ايتمان
document.querySelectorAll('#form-checkout input[name="payment-method"]').forEach((item) => {
  item.addEventListener("change", () => {
    const paymentMethod = item.value;

    const creditCardInputs = document.querySelectorAll('#credit-card-info input')
    
    if(paymentMethod === 'on-delivery') {
      creditCardInputs.forEach((input) => {
        input.style.display='none'
      })
    } else {
      creditCardInputs.forEach((input) => {
        input.style.display='block'
      })
    }

    
  })
})




document.getElementById("#copyright").innerHTML =
  "جميع الحقوق محفوظ سنة " + new Date().getFullYear();

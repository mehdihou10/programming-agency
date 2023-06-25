
//start declare arrays of dark/light mode
let arrMode = [];
let arrModeBg = [];
let arrModeColor = [];
let arrModeShow = [];
let arrModeShadow = [];

/*----------------start landing page---------------*/

/*----------------start header---------------*/

//variables:

//change background images:
let indBackground = 0;

//setinterval variable
let c;

//setInterval check
let checkInterval = true;

//create array of background images links
let arrBackground = ["img/image1.jpg","img/image2.jpg","img/image3.jpg","img/image4.jpg"];


//select elements
let landing = document.querySelector(".landing-page");
let landingImg = document.querySelector(".landing-page > img");
let header = document.querySelector("header");
let bars = document.querySelector("header .toggle");
let bullets = document.querySelector(".landing-page .bullets");
let xmark = document.querySelector("header .remove");
let ulHeader = document.querySelector("header ul");
let headerLinks = document.querySelectorAll("header ul a");

//show navbar
bars.onclick = function(){
    ulHeader.classList.add("show");
    header.classList.add("over");
}

//remove navbar
xmark.onclick = function(){
    ulHeader.classList.remove("show");
    header.classList.remove("over");
}

//set background color to header on scrolling
window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){
        header.classList.add("bg");
    }
    else{
        header.classList.remove("bg");
    }

});


//create bullets that depend on array of background length
for(let i = 0; i < arrBackground.length; i++){
    //create bullet
    let span = document.createElement("span");
    
    //add active class on first element
    if(i === 0){
        span.className = "active";
    }

    //append bullet span to bullets parent
    bullets.appendChild(span);
}

//get bullet spans
let spansBullet = document.querySelectorAll(".landing-page .bullets span");

//automaticly


function automaticly(){
    if(checkInterval){
        c = setInterval(()=>{
            //increament of backgrounds index    
            indBackground++;
            changBackground();
            
        },5000);
    }
 
}
automaticly();

//by click
spansBullet.forEach((span,index)=>{
    span.addEventListener("click",()=>{
        indBackground = index;
        changBackground();
    })
});

//function of changing background
function changBackground(){
    

if(indBackground === arrBackground.length){
    indBackground = 0;
}

//change background
landingImg.src = arrBackground[indBackground];

//change bullet
bulletChange();
}

//function of bullets changing
function bulletChange(){

//remove active class from bullet    
spansBullet.forEach((span)=>{
span.classList.remove("active");

});

//add active class to bullet
spansBullet[indBackground].classList.add("active");



}

//add data-section to all links
headerLinks.forEach((link)=>{
    link.dataset.section = link.innerHTML === "Home" ? "landing-page" : link.innerHTML.toLowerCase();
});

//go to the selected section when you click on link
scrollToSection(headerLinks);

//change active class onscrolling
changeActiveOnScrolling(headerLinks);

//remove current active class when you arrive on timeline section
window.addEventListener("scroll",()=>{

    if(window.scrollY >= document.querySelector(".timeline").offsetTop && window.scrollY < document.querySelector(".services").offsetTop){
        headerLinks.forEach(link => link.classList.remove("active"));
    }
});

/*----------------end header---------------*/

/*----------------end landing page---------------*/

/*----------------start about---------------*/

//put about's overlay in array of mode to show it in dark mode
let aboutOverlay = document.querySelector(".about > span");

arrModeShow.push(aboutOverlay);

//put about's paragraph in array of mode to change her color in dark mode
let aboutParagraph = document.querySelector(".about p");

arrModeColor.push(aboutParagraph);

/*----------------end about---------------*/


/*----------------start skills---------------*/

//select elements
let skills = document.querySelector(".skills");
let progressSpan = document.querySelectorAll(".skills .progress span");

//put skill in array of mode to change her background in dark mode
arrModeBg.push(skills);

//complete the progress when you arrive on skills section
window.addEventListener("scroll",()=>{

    if(window.scrollY >= skills.offsetTop - 350 && window.scrollY < document.querySelector(".gallery").offsetTop - 200){
        progressSpan.forEach((span)=>{

            span.style.width = span.dataset.width;
        });

    }
    else{
        progressSpan.forEach((span)=>{

            span.style.width = 0;
        });
    }
});


/*----------------end skills---------------*/

/*----------------start gallery---------------*/

//select elements
let gallery = document.querySelector(".gallery");
let imagesParents = document.querySelectorAll(".gallery .image");
let imgsChildren = document.querySelectorAll(".gallery .image img");
let seeButton = document.querySelector(".gallery button");

//put gallery in array of mode to change her background in dark mode
arrModeBg.push(gallery);


//see more images + see less images
seeButton.onclick = function(){

    // see more images
    if(seeButton.innerHTML.toLowerCase() === "see more"){

        //add images
    imagesParents.forEach((image)=> image.classList.contains("del") ? image.classList.remove("del") : image);

    //change button text
    this.innerHTML = "SEE LESS";

    } else{

        //remove images
    imagesParents.forEach((image)=> image.dataset.image === "delete" ? image.classList.add("del") : image);

    //change button content
    this.innerHTML = "SEE MORE";

    }

};


//create popup when you click on the image


//create overlay of body
let overlayBody = document.createElement("span");
overlayBody.className = "overlay-body";
document.body.appendChild(overlayBody);

//get index of current image
let indImage;

imgsChildren.forEach((img,index)=>{

    img.onclick = function(){

        //set the index of current image
        indImage = index;

        let popup = document.createElement("div");
        popup.className = "image-popup";

        //create the image inside popup
        let imgPopup = this.cloneNode(true);
        popup.appendChild(imgPopup);


        //create title indise popup
        let title = document.createElement("h3");
        title.innerHTML = imgPopup.alt;
        popup.prepend(title);

        //create "X" mark to remove popup and overlay of body
        let remove = document.createElement("i");
        remove.className = "fa-solid fa-xmark c-white d-center c-pointer remove-popup";
        popup.appendChild(remove);

        //create next/previous image
        
        // next:
        let next = document.createElement("i");
        next.className = "fa-solid fa-chevron-right chevron ch-right";
        popup.append(next);

        //remove chevron left if it is the last image
        if(indImage === imgsChildren.length - 1){
            next.classList.add("remove");
        }

        //previous:
        let prev = document.createElement("i");
        prev.className = "fa-solid fa-chevron-left chevron ch-left";
        popup.append(prev);

        //remove chevron left if it is the first image
        if(indImage === 0){
            prev.classList.add("remove");
        }


        //put popup inside gallery section
        gallery.appendChild(popup);

        overlayBody.classList.add("show");
        document.body.style.overflow = "hidden";
    };

});

document.addEventListener("click",(e)=>{

//remove popup after clicking on "X" mark + remove overlay
    if(e.target.classList.contains("remove-popup")){
        e.target.parentElement.remove();
        overlayBody.classList.remove("show");
        document.body.style.overflow = "visible";
    }

    let currentImage =  document.querySelector(".gallery .image-popup img");
    let currentTitle = document.querySelector(".gallery .image-popup h3");

    //go to next image when you click on chevron right
    if(e.target.classList.contains("ch-right")){
        indImage++;
        nextPrevImage("left",imgsChildren.length - 1);
    }

    //go to previous image when you click on chevron left
    if(e.target.classList.contains("ch-left")){
        indImage--;
        nextPrevImage("right",0);
    }

    //function of next/prev image and changes
    function nextPrevImage(direction , end){

        //remove the chevron if he arrive at the limit
        if(indImage === end){
            e.target.classList.add("remove");
        }
        //if the other chevron arrive at his end it removed and you must click on other chevron for it showed
        document.querySelector(`.gallery .image-popup .ch-${direction}`).classList.remove("remove");

        //change current image
        currentImage.src = imgsChildren[indImage].src;
        currentImage.alt = imgsChildren[indImage].alt;
        
        //change title
        currentTitle.innerHTML = currentImage.alt;
        
    }
});


/*----------------end gallery---------------*/

/*----------------start  timeline---------------*/

//put timeline in array of mode to change her background in dark mode

let timeline = document.querySelector('.timeline');
arrModeBg.push(timeline);

/*----------------end  timeline---------------*/

/*----------------start services---------------*/

//select elements
let services = document.querySelector(".services");
let boxSercices = document.querySelectorAll(".services .box");

//put services in array of mode to change her background in dark mode
arrModeBg.push(services);

//add indicator of each box in span
boxSercices.forEach((box,index)=>{

    let span = document.createElement("span");
    span.innerHTML = index < 10 ? "0" + ++index : ++index;
    box.append(span);
})

/*----------------end services---------------*/

/*----------------start testimonials---------------*/

//put testimonials in array of mode to change her background in dark mode
let testimonials = document.querySelector(".testimonials");

arrModeBg.push(testimonials);

//put testimonials boxes in array of mode to change her box-shadow in dark mode
let testimonialsBoxesImgs = document.querySelectorAll(".testimonials .container .testimonials-content .box,.testimonials .container .testimonials-content .box img");
arrModeShadow.push(...Array.from(testimonialsBoxesImgs));

/*----------------end testimonials---------------*/

/*----------------start contact---------------*/

//put testimonials in array of mode to change her background in dark mode
let contact = document.querySelector(".contact");

arrModeBg.push(contact);

/*----------------end testimonials---------------*/


/*----------------start footer---------------*/

//select elements
let subscribeBtn = document.getElementById("subscribe");
let iconSubBtn = subscribeBtn.children[0];
let email = document.querySelector("footer input");
//verify if local storage has the item "subscribe"
if(window.localStorage.getItem("subscribe")){

    //stop button clicking
    subscribeBtn.classList.add("stop");
    iconSubBtn.className = "fa-solid fa-check show";
}


subscribeBtn.onclick = function(){

    if(/\w+@\w+\.\w{3,}/ig.test(email.value)){
        //show icon
    iconSubBtn.classList.add("show");

    setTimeout(()=>{

        //replace the icon of loading by checking
        iconSubBtn.className = "fa-solid fa-check show";

    },2000);

    //stop clicking button when you click on it
    this.classList.add("stop");

    //store the answer in local storage
    window.localStorage.setItem("subscribe",email.value);
    }
    else{
        if(email.value.trim() === ""){
            alert("You Must Write Your Email");
        }
        else{
            alert("Please Enter a Valid Email");
        }
    }

}


/*----------------end footer---------------*/





/*----------------start settings---------------*/

//select elements
let setting = document.querySelector(".settings");
let settingIcon = document.querySelector(".settings .setting-icon");
let removeSetting = document.querySelector(".settings .remove");

//put setting icon in array of mode to remove her box shadow in dark mode
arrModeShadow.push(settingIcon);

//stop propagation
setting.addEventListener("click",(e)=>{

    e.stopPropagation();
});


//show setting content by clicking on setting icon + spin the setting icon
settingIcon.onclick = function(){
    setting.classList.add("show");
    this.children[0].classList.add("fa-spin");
    setting.children[1].classList.add("show");
}

//remove setting + settings icon spin
removeSetting.onclick = function(){
    setting.classList.remove("show");
    settingIcon.children[0].classList.remove("fa-spin");
    setting.children[1].classList.remove("show");
}

document.addEventListener("click",(e)=>{

    if(e.target !== setting){

        if(setting.classList.contains("show")){
            setting.classList.remove("show");
            settingIcon.children[0].classList.remove("fa-spin");
            setting.children[1].classList.remove("show");
        }
    }
});

//colors part:---

//select elements
let colorsSpans = document.querySelectorAll(".settings .colors .colors-content span");

//check if localStorage is empty or no, if no make changes
if(window.localStorage.getItem("main-color")){

//set the active color
document.styleSheets[2].rules[0].style.setProperty("--main-color",window.localStorage.getItem("main-color"));

//remove active class from all spans + set the active class
colorsSpans.forEach((span)=>{
    //remove active class
    span.classList.remove("active");

//set the active class
    if(span.dataset.color === window.localStorage.getItem("main-color")){
        span.classList.add("active");
    }
});

}


//change the main color by click + change the active class
colorsSpans.forEach((span)=>{

    span.addEventListener("click",()=>{
        //change main color
        document.styleSheets[2].rules[0].style.setProperty("--main-color",span.dataset.color);

        //put main color choosen in the localStorage
        window.localStorage.setItem("main-color",span.dataset.color);

        //change active class
        colorsSpans.forEach((del)=>{
            del.classList.remove("active");
        });

        //put the active class on clickable span
        span.classList.add("active");

    });

});

//backgrounds part:

//select elements
let backgroundsSpans = document.querySelectorAll(".settings .backgrounds .backgrounds-content span");
let yesBackgorund = backgroundsSpans[0];
let nonBackgorund = backgroundsSpans[1];
let selectbg = document.querySelector(".settings .backgrounds .select-background");
let selectBgSpans = document.querySelectorAll(".settings .backgrounds .select-background span");
let upIcon = document.querySelector(".settings .backgrounds i");

//show up icon on scrolling
window.addEventListener("scroll",()=>{

    if(window.scrollY >= document.querySelector(".about").offsetTop){
        upIcon.classList.add("show");
    }
    else{
        upIcon.classList.remove("show")
    }

});

//go back to the start of the page
upIcon.addEventListener("click",()=> window.scrollTo({top: 0, behavior: "smooth"}));

//verify if localStorage is empty or no , if it's not empty:
let selectAnswer = window.localStorage.getItem("bg-answer");
if(selectAnswer){
    //remove active class from "yes"
    yesBackgorund.classList.remove("active");

    //add active class to "no";
    nonBackgorund.classList.add("active");
    indBackground = selectAnswer;
    selectNo();

    //set the check setInterval
    checkInterval = false;

    //change background
    landingImg.src = arrBackground[indBackground];

}


//change the background by click + change the active class
backgroundsSpans.forEach((span)=>{

    span.addEventListener("click",(e)=>{

        //change active class
        backgroundsSpans.forEach((del)=>{
            del.classList.remove("active");
        });

        //put the active class on clickable span
        e.currentTarget.classList.add("active");

    });

});

//stop setinterval by clicking on "no"
nonBackgorund.addEventListener("click",()=>{
selectNo();

//save in localStorage
window.localStorage.setItem("bg-answer",indBackground);


});

//show the setinterval by clicking on "yes"
yesBackgorund.addEventListener("click",()=>{
//set the check setInterval

checkInterval = true;    
automaticly();

//remove select part
selectbg.classList.remove("show");

//show bullets (if you click "no" before)
bullets.classList.remove("remove");

//remove active class
selectBgSpans.forEach(span => span.classList.remove("active"));

bulletChange();

//remove "no" from localStorage
window.localStorage.removeItem("bg-answer");

});

//choose background
selectBgSpans.forEach((span)=>{
span.onclick = function(){

//remove active class
selectBgSpans.forEach(del => del.classList.remove("active"));

//add active class to clickable element
this.classList.add("active");

//set the new background
landingImg.src = arrBackground[+this.innerHTML - 1];

//set the indicator of change background
indBackground = +this.innerHTML - 1;


//save in localStorage
window.localStorage.setItem("bg-answer",indBackground);

};

});

//function of: when you select "no" 
function selectNo(){
//stop interval    
clearInterval(c);

//show select part
selectbg.classList.add("show");

//add active class to span who has the interval indicator
selectBgSpans[indBackground].classList.add("active");

//remove bullets
bullets.classList.add("remove");
}

//bullets section part:---

//select elements
let BulletsSections = document.querySelector(".sec-bullets");
let yesBullet = document.querySelectorAll(".settings .content .bullets-settings span")[0];
let noBullet = document.querySelectorAll(".settings .content .bullets-settings span")[1];

//verify if the local storage has the item "bullet-answer"
if(window.localStorage.getItem("bullet-answer")){

    //change active class
    yesBullet.classList.remove("active");
    noBullet.classList.add("active");

    //remove sections bullets
    BulletsSections.classList.add("remove");
}

//show bullets when you click on "yes"
yesBullet.onclick = function(){
noBullet.classList.remove("active");
this.classList.add("active");
BulletsSections.classList.remove("remove");

//remove the "no" answer from local storage
window.localStorage.removeItem("bullet-answer");
};


//remove bullets when you click on "no"
noBullet.onclick = function(){
yesBullet.classList.remove("active");
this.classList.add("active");
BulletsSections.classList.add("remove");

//add the answer in local storage 
window.localStorage.setItem("bullet-answer",this.innerHTML);
}

//modes part :---

//arrays that will be in local storage
let arrModeLocalStorage = [];
let arrModeBgLocalStorage = [];
let arrModeColorsLocalStorage = [];
let arrModeShowLocalStorage = [];
let arrModeShadowLocalStorage = [];

//set the elements classNames in arrays of local Storage
arrModeBg.forEach(bg => arrModeBgLocalStorage.push(bg.classList[0]));
arrModeColor.forEach(color => arrModeColorsLocalStorage.push(color.classList[0]));
arrModeShow.forEach(sh => arrModeShowLocalStorage.push(sh.classList[0]));
arrModeShadow.forEach(shadow => arrModeShadowLocalStorage.push(shadow.classList[0]));

//put arrays in one array
arrModeLocalStorage.push(arrModeBgLocalStorage,arrModeColorsLocalStorage,arrModeShowLocalStorage,arrModeShadowLocalStorage);


//select elements
let toggleSwitch = document.querySelector(".settings .content .modes .toggle-switch");
let ballSwitch = toggleSwitch.children[0];

//verify if local storage has the item "dark-mode" then do changes
let modeLocalStorage = window.localStorage.getItem("dark-mode");
if(modeLocalStorage){

    //make the toggle switch full (go to dark mode)
    toggleSwitch.classList.add("full");
    ballSwitch.classList.add("full");

    //variables
    let data = JSON.parse(window.localStorage.getItem("dark-mode"));
    let bgArray = data[0];
    let colorsArray = data[1];
    let showArray = data[2];
    let shadowArray = data[3];
    
    //array of backgrounds
    bgArray.forEach(bg => document.querySelector(`.${bg}`).classList.add("bg-change"));

    //array of colors
    colorsArray.forEach(color => document.querySelector(`.${color}`).classList.add("c-white"));

    //array of show hidden elements
    showArray.forEach(sh => document.querySelector(`.${sh}`).classList.add("show-el"));

    //array of shadow
    shadowArray.forEach(shadow => document.querySelector(`.${shadow}`).classList.add("remove-shadow"));
}


//change the mode by clicking on toggle switch
toggleSwitch.addEventListener("click",()=>{

//change toggle switch
toggleSwitch.classList.toggle("full");
ballSwitch.classList.toggle("full");

//add modifications on arrays

//array of background
arrModeBg.forEach(bg => bg.classList.toggle("bg-change"));

//array of show
arrModeShow.forEach(sh => sh.classList.toggle("show-el"));

//array of colors
arrModeColor.forEach(cl => cl.classList.toggle("c-white"));

//array of shadows
arrModeShadow.forEach(shadow => shadow.classList.toggle("remove-shadow"));


//do changes on local storage that depend on toggle switch situation
if(toggleSwitch.classList.contains("full")){

    //save dark mode in local Storage
    window.localStorage.setItem("dark-mode",JSON.stringify(arrModeLocalStorage));

}
else{
    //clear the local Storage from the item ("dark-mode") 
    window.localStorage.removeItem("dark-mode");
}

});






//reset options part:---

document.getElementById("reset").onclick = function(){

    window.localStorage.clear();
    window.location.reload();
};

/*----------------end settings---------------*/

/*----------------start sections bullets---------------*/


//select elements
let secBullets = document.querySelector(".sec-bullets");

//create bullets

//get sections number
let sections = document.querySelectorAll("body > div:not(.settings , .sec-bullets)");

//loop on sections 
for(let i = 0; i < sections.length; i++){

    //create bullet parent
    let bullet = document.createElement("div");
    bullet.className = "bullet";

    //create bullet
    let spanOne = document.createElement("span");
    spanOne.dataset.section = sections[i].classList[0];

    //add active class to the first bullet
    if(i === 0) spanOne.className = "active";

    bullet.appendChild(spanOne);

    //create section name
    let spanTwo = document.createElement("span");
    spanTwo.innerHTML = i === 0 ? "home" :sections[i].classList[0];
    bullet.appendChild(spanTwo);

    //put bullet parent in bullets section
    secBullets.appendChild(bullet); 
}

//select bullets after their creations
let bulletOfSec = document.querySelectorAll(".sec-bullets .bullet span:first-child");


//scroll to the selected section when you click on section bullet
scrollToSection(bulletOfSec);

//change the active class when you arrive to arrive to section's offsetTop
changeActiveOnScrolling(bulletOfSec);

/*----------------end sections bullets---------------*/

/*functions that i use them in different sections :______*/

//function that go to section that you click on her indicator(like bullets) : header + sections bullets
function scrollToSection(elements){

    elements.forEach((element)=>{

        //after clicking on element you go to section
        element.onclick = (e)=>{

            document.querySelector(`.${element.dataset.section}`).scrollIntoView();

            //change active class
            elements.forEach(el => el.classList.remove("active"));
            setTimeout(()=>{
                element.classList.add("active");
            },1000);

            //do changes when the element is an "a" tag
            if(element.tagName.toLowerCase() === "a"){
                e.preventDefault();
            }
        };
    });
}

//function that change active class on sections indicators : header + sections bullets
function changeActiveOnScrolling(elements){

    //do changes on scrolling
    window.addEventListener("scroll",()=>{

        //loop on all elements
        elements.forEach((element,index)=>{

            //verify if the element is not the last one
            if(window.scrollY < document.querySelector(`.${elements[elements.length - 1].dataset.section}`).offsetTop - 100){

                //verify if the element is on his section
            if(window.scrollY >= document.querySelector(`.${element.dataset.section}`).offsetTop -100 && window.scrollY < document.querySelector(`.${elements[index + 1].dataset.section}`).offsetTop - 100){
                
                //add active class
                elements.forEach(el => el.classList.remove("active"));
                element.classList.add("active");
            }
            } 

            //the last element
            else{
                //add active class
                elements.forEach(el => el.classList.remove("active"));
                element.classList.add("active");
            }


        })
        
    });
}

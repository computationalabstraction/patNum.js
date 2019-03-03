const IGREG = (15+31*(10+12*1582));

function julday(day,month,year)
{
    let jul;
    let ja;
    let jy = year;
    let jm;
    if(jy == 0) console.log("julday: there is no year zero");
    if (jy < 0) ++jy;
    if (month > 2) 
    {
        jm=month+1;
    } 
    else 
    {
        --jy;
        jm=month+13;
    }
    jul = (Math.floor(365.25 * jy) + Math.floor(30.6001 * jm) + day + 1720995);
    if (day+31*(month+12*year) >= IGREG) 
    { 
        ja = parseInt(0.01*jy);
        jul += 2 - ja + parseInt(0.25 * ja);
    }
    return jul;
}

const weekmap = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function weekday(day,month,year)
{
    const jd = julday(day,month,year);
    const temp = (jd + 1) % 7;
    return [temp,weekmap[temp]];
}


function caldat(julian)
{
    let ja,jalpha,jb,jc,jd,je;
    let day,month,year;
    if (julian >= IGREG) {
        jalpha=parseInt((((julian-1867216)-0.25)/36524.25));
        ja=julian+1+jalpha-parseInt((0.25*jalpha));
    } else if (julian < 0) { 
        ja=julian+36525*(1-julian/36525);
    } else
        ja=julian;
    jb = ja+1524;
    jc = parseInt((6680.0+((jb-2439870)-122.1)/365.25));
    jd = parseInt((365*jc+(0.25*jc)));
    je = parseInt(((jb-jd)/30.6001));
    day=jb-jd-parseInt((30.6001*je));
    month=je-1;
    if (month > 12) month -= 12;
    year = jc-4715;
    if (month > 2) --(year);
    if (year <= 0) --(year);
    if (julian < 0) year -= 100*(1-julian/36525);
    return [day,month,year];
}


console.log(weekday(20,1,2019));
console.log(caldat(julday(20,1,2019)));
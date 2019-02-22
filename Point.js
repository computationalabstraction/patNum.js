function centroid(...points)
{
    let cp = [];
    for(let p of points)
    {
        for(let n in points) cp[n] += p[n];
    }  
    for(let n in cp) cp[n] /= points.length;
    return cp;
}

function midpoint(...points)
{
    let cp = [];
    for(let p of points)
    {
        for(let n in points) cp[n] += p[n];
    }  
    for(let n in cp) cp[n] /= 2;
    return cp;
}

const COLINEAR = 0;
const CLOCKWISE = 1;
const ANTICLOCKWISE = 2;

function orientation(p1,p2,p3)
{
    if(p1.length < 3 && p2.length < 3 && p3.length < 3)
    {
        p1.push(0);
        p2.push(0);
        p3.push(0);
    }
    let p1p2 = [];
    for(let i in p1)
    {
        p1p2.push(p2[i] - p1[i]);
    }
    let p2p3 = [];
    for(let i in p2)
    {
        p1p2.push(p3[i] - p2[i]);
    }
    let temp = (p1p2[1]*p2p3[2]-p2p3[1]*p1p2[2]) 
             - (p1p2[0]*p2p3[2]-p2p3[0]*p1p2[2])
             + (p1p2[0]*p2p3[1]-p2p3[0]*p1p2[1]);
    if(temp == 0) return COLINEAR;
    else if(temp > 0) return CLOCKWISE;
    else if(temp < 0) return ANTICLOCKWISE;
}

function angle(...points)
{
    let num = 0;
    for(let i = 0; i < points[0].length;i++)
    {
        let temp = 0;
        for(let j in points)
        {
            temp += points[j][i];
        }
        num += temp;
    }
    let de = 1;
    for(let p of points)
    {
        let temp = 0;
        for(let n of p)
        {
            temp += n ** 2;
        }
        de *= Math.sqrt(temp);
    }
    return Math.atan2(num,de) * (180/Math.PI)
}

function distance(p1,p2)
{
    let dis = 0;
    for(let i = 0; i < p1.length;i++)
    {
        dis += (p2[i] - p1[i]) ** 2
    }
    return Math.sqrt(dis);
}

function minDistance(a,b)
{
    let h = 0;
    for(let p1 of a)
    {
        let shortest = 0;
        for(let p2 of b)
        {
            let dis = distance(p1,p2);
            if(dis < shortest) shortest = dis;
        }
        if(dis > shortest) h = shortest;
    }
    return h;
}

function hausdorffDistance(a,b)
{
    let h = 0;
    for(let p1 of a)
    {
        let shortest = 0;
        for(let p2 of b)
        {
            let dis = distance(p1,p2);
            if(dis < shortest) shortest = dis;
        }
        if(shortest > h) h = shortest;
    }
    return h;
}

function nndist(...points)
{
    let ndis = [];
    for(let p1 of points)
    {
        let nearest = 0;
        for(let p2 of points)
        {
            let temp = distance(p1,p2);
            if(nearest > temp) nearest = temp;
        }
        ndis.push(nearest);
    }
}

function toPolar(point)
{
    let pp = [];
    pp[0] = Math.sqrt(point[0] ** 2 + point[1] ** 2);
    pp[1] = Math.atan2(point[1],point[0]);
    if(point[0] < 0 || point[0] < 0 && point[1] < 0) pp[1] += 180;
    if(point[1] < 0) pp[1] += 360;
    return pp;
}

function toCartesian(polar)
{
    let cp = [];
    cp[0] = point[0] * Math.cos(point[1]);
    cp[1] = point[0] * Math.sin(point[1]);
    return cp;
}
// function circumcenter(...points)
// {
//     let cp = [];
//     for(let p of points)
//     {
//         for(let n in points) cp[n] += p[n];
//     }  
//     for(let n in cp) cp[n] /= 3;
//     return cp;
// }
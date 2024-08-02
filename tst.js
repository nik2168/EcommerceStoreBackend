let a = [{name: "Nik", role: "admin"}]
console.log(a)

if (a.includes({ name: "Nik", role: "admin" })) {
  a = a.map((i) => {
    if (i.name === "Nik") {
      i.role = "member";
    }
    return i;
  });
}

console.log(a)

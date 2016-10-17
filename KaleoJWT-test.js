var data = {email: "ns@thenorth.com",firstname: "Ned", lastname: "Stark"};
var token = generateSignedToken(HEADER, data, "got");
var shouldBe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5zQHRoZW5vcnRoLmNvbSIsImZpcnN0bmFtZSI6Ik5lZCIsImxhc3RuYW1lIjoiU3RhcmsifQ.NJ8jfs3gewtS_rkrzfO4boWid-exbpTYu3xZRWMO7Q0"
return (shouldBe === token) || ("Generated token is incorrect:"+token)
}

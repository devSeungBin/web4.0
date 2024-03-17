const User = require("../model/User");
const bcrypt = require("bcryptjs");
// bcrypt 모듈을 가져옵니다. 이 모듈은 비밀번호 암호화에 사용됩니다.

const signUp = async (req, res, next) => {
    // // 사용자 등록 함수입니다.

    // const { name, email, password } = req.body;

    // let existingUser;

    // try {
    //     existingUser = await User.findOne({ email });
    //     // 이미 존재하는 이메일을 가진 사용자가 있는지 확인합니다.
    // } catch (err) {
    //     console.error(err);
    //     // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    //     return res.status(500).json({ message: "Internal Server Error" });
    //     // 내부 서버 오류를 응답으로 보냅니다.
    // }

    // if (existingUser) {
    //     return res.status(400).json({ message: "User already exists" });
    //     // 이미 존재하는 사용자인 경우 400 응답을 반환합니다.
    // }

    // const hashedPassword = bcrypt.hashSync(password);
    // // 비밀번호를 해싱하여 보안을 강화합니다.

    // const user = new User({
    //     name,
    //     email,
    //     password: hashedPassword,
    //     // 해싱된 비밀번호를 사용하여 사용자 객체를 생성합니다.
    //     blogs: []
    // });

    // try {
    //     await user.save();
    //     // 사용자를 데이터베이스에 저장합니다.
    //     return res.status(201).json({ user });
    //     // 성공적으로 사용자를 등록한 경우 사용자 정보를 응답으로 보냅니다.
    // } catch (err) {
    //     console.error(err);
    //     // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    //     return res.status(500).json({ message: "Internal Server Error" });
    //     // 내부 서버 오류를 응답으로 보냅니다.
    // }
}

const logIn = async (req, res, next) => {
    // // 로그인 함수입니다.

    // const { email, password } = req.body;

    // let existingUser;

    // try {
    //     existingUser = await User.findOne({ email });
    //     // 해당 이메일을 가진 사용자를 찾습니다.
    // } catch (err) {
    //     console.error(err);
    //     // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    //     return res.status(500).json({ message: "Internal Server Error" });
    //     // 내부 서버 오류를 응답으로 보냅니다.
    // }

    // if (!existingUser) {
    //     return res.status(404).json({ message: "User not found" });
    //     // 사용자를 찾지 못한 경우 404 응답을 반환합니다.
    // }

    // const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    // // 사용자가 제공한 비밀번호와 저장된 해시된 비밀번호를 비교합니다.

    // if (!isPasswordCorrect) {
    //     return res.status(400).json({ message: "Incorrect password" });
    //     // 비밀번호가 일치하지 않는 경우 400 응답을 반환합니다.
    // }

    // return res.status(200).json({ user: existingUser });
    // // 로그인에 성공한 경우 사용자 정보를 응답으로 보냅니다.
}

module.exports = { signUp, logIn };
// 모듈로 내보냅니다.

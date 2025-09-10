const FolderSchema = require("../../models/FolderSchema");
const userSchema = require("../../models/UserSchema");
const addActivity = require("../../utils/ActivityLoger");
const AddinsideFolder = require("./AddInsideFolder");

const AddFolder = async (req, res) => {

        const { title, desc, isPrivate, folderId } = req.body;
        const uid = req.user._id;
        try {
                const folderSchema = new FolderSchema({
                        userId: uid,
                        title,
                        desc,
                        isPrivate,
                });
                const newFolder = await folderSchema.save();
                console.log(newFolder);

                addActivity(uid, "create", "create folder successfully")
                if (folderId) {
                        req.body.folderId = folderId,
                        req.body.uploadId = newFolder._id;
                        req.body.type = "folders";
                        await AddinsideFolder(req, res);
                }

                res.status(200).json({ msg: "folder created", success: true });
        } catch (e) {
                res.status(400).json({ msg: e.message, success: false });
        }
}
module.exports = AddFolder;
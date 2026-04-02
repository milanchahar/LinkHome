const fs = require('fs');

function replaceStr(file, target, repl) {
  const p = '/Users/milanchahar/Desktop/LinkHome/client/' + file;
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.split(target).join(repl);
    fs.writeFileSync(p, content);
  }
}

// 1. BrowseMap 'i'
replaceStr('src/components/BrowseMap.jsx', '(b, i) =>', '(b) =>');

// 2. BrowseRooms 'i'
replaceStr('src/components/BrowseRooms.jsx', '(_, i) =>', '() =>');

// 3. EditRoom getPlaceholderImage and 'err' in catch blocks
replaceStr('src/components/EditRoom.jsx', 'import { getPlaceholderImage } from "../utils/placeholders";\n', '');
replaceStr('src/components/EditRoom.jsx', 'getPlaceholderImage,', '');
replaceStr('src/components/EditRoom.jsx', '} catch (err) {\n            toast.error("Failed to load property data.");', '} catch {\n            toast.error("Failed to load property data.");');
replaceStr('src/components/EditRoom.jsx', '} catch (err) {\n            toast.error("Failed to update property.");', '} catch {\n            toast.error("Failed to update property.");');

// 4. ListRoom 'err'
replaceStr('src/components/ListRoom.jsx', '} catch (err) {\n            toast.error', '} catch {\n            toast.error');

// 5. Login useNavigate
replaceStr('src/components/Login.jsx', 'import { useNavigate, Link } from "react-router-dom";', 'import { Link } from "react-router-dom";');
replaceStr('src/components/Login.jsx', '  const navigate = useNavigate();\n', '');

// 6. MyListings 'err'
replaceStr('src/components/MyListings.jsx', '} catch (err) {\n            toast.error("Failed to load your listings.");', '} catch {\n            toast.error("Failed to load your listings.");');

// 7. PropertyView 'err' and 'e'
replaceStr('src/pages/PropertyView.jsx', '} catch (err) {\n                try {', '} catch {\n                try {');
replaceStr('src/pages/PropertyView.jsx', '} catch (e) {\n                    toast.error("Property not found.");', '} catch {\n                    toast.error("Property not found.");');
replaceStr('src/pages/PropertyView.jsx', '} catch (e) { imagesSource = []; }', '} catch { imagesSource = []; }');

console.log("Replacements done");

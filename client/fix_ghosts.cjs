const fs = require('fs');
const files = {
  'src/App.jsx': [{ target: '  const user = JSON.parse(localStorage.getItem("user"));\n', replace: '' }],
  'src/components/BrowseMap.jsx': [{ target: '(b, i) =>', replace: '(b) =>' }],
  'src/components/BrowseRooms.jsx': [{ target: '(_, i) =>', replace: '() =>' }],
  'src/components/EditRoom.jsx': [
    { target: 'getPlaceholderImage,', replace: '' },
    { target: '} catch (err) {', replace: '} catch {', global: true }
  ],
  'src/components/ListRoom.jsx': [{ target: '} catch (err) {', replace: '} catch {', global: true }],
  'src/components/Login.jsx': [{ target: '  const navigate = useNavigate();\n', replace: '' }],
  'src/components/MyListings.jsx': [{ target: '} catch (err) {', replace: '} catch {' }],
  'src/pages/MessagingHub.jsx': [
    { target: 'import { fetchWithTiming } from "../utils/fetchWithTiming";\n', replace: '' },
    { target: '} catch (error) {', replace: '} catch {', global: true }
  ],
  'src/pages/PropertyView.jsx': [
    { target: '} catch (err) {', replace: '} catch {' },
    { target: '} catch (e) {', replace: '} catch {', global: true }
  ]
};

for (const [file, replacements] of Object.entries(files)) {
  const p = '/Users/milanchahar/Desktop/LinkHome/client/' + file;
  if (!fs.existsSync(p)) {
      console.log('Skipping ' + p);
      continue;
  }
  let content = fs.readFileSync(p, 'utf8');
  for (const r of replacements) {
    if (r.global) {
      content = content.split(r.target).join(r.replace);
    } else {
      content = content.replace(r.target, r.replace);
    }
  }
  fs.writeFileSync(p, content);
}
console.log('Fixed ghost variables');

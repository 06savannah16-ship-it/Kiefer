# 给艺术品衰败的机会

**Anselm Kiefer: Matter, Ruin and Transformation**

在线展览：https://06savannah16-ship-it.github.io/Kifer/

一个以滚动叙事展开的线上展览 V1。项目基于 [Marginalia](https://github.com/uxderrick/marginalia) 改造，保留它的 React + Vite、Framer Motion、Lenis 平滑滚动和章节式转场，将视觉语言从 Renaissance portfolio 改为材料剧场与 conservation lab。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址，通常是 `http://localhost:5173`。

检查正式构建：

```bash
npm run build
npm run preview
```

## V1 内容

- Opening｜展览前言
- Chapter 01｜废墟不是终点
- Chapter 02｜材料在继续发生
- 《Aschenblume / 灰烬之花》滚动注释场景
- 《Merkaba》材料并置场景
- Chapter 03｜Conservation Lab / Condition Report
- 三个修复判断案例
- 《Die Lebenden und die Toten / 生者与死者》
- Epilogue
- AI Material Transformation Experiment 可操作 Demo
- AI Lab Notes 失败 / 修订 / 接受案例
- 05 结尾的观众图片入口（当前为本地预览，不上传、不调用 API）
- 桌面作品资料整理成 Material Atlas

## 互动实验说明

项目已识别到桌面上的 `material-decay-aesthetics` Skill 与本地 Agent 配置。当前网页保持为纯前端静态项目，因此互动区使用已经生成的测试图片制作可操作的比较 Demo：可以加载研究案例、查看材料判断与操作链，并拖动滑杆比较原图和重构结果。

这不是假的实时生成。页面明确标注为 `PRECOMPUTED STUDY`。如果下一版需要开放上传并实时调用 Skill，应增加服务器端接口，API key 不能放进浏览器代码。

05 的最后保留了 `Visitor Material Intake` 入口。当前状态为 `API OFFLINE / ACTIVATION PENDING`：观众选择的图片只会在自己的浏览器中预览，不会上传、保存或产生 API 费用。未来接上服务器端 Agent 与图像生成接口时，可以保留现有界面，只替换提交逻辑。

## GitHub Pages 发布

推送到 `main` 后，GitHub Actions 会自动构建并部署。首次发布时，需要在仓库 Settings → Pages 中把 Source 设为 `GitHub Actions`。

## 主要文件

- `src/marginalia/Marginalia.jsx`：展览结构与文案
- `src/marginalia/Marginalia.css`：视觉、响应式布局与转场
- `src/marginalia/ActivationGate.css`：待激活的观众上传入口
- `public/assets/exhibition/`：当前版本使用的作品图片
- `public/assets/exhibition/works/`：从桌面资料夹整理出的补充作品
- `public/assets/exhibition/lab/`：Skill 测试输入、失败案例与重构结果

## 图片与发布提醒

V1 优先使用了原对话中上传的三张作品图片。正式公开发布前，应逐一确认图片版权、馆藏信息、图源和署名要求。

## 许可证

原模板采用 MIT License；完整许可文本保留在 `LICENSE`。改造版本继续保留原作者 Derrick Tsorme 与 Marginalia 的来源说明。

import { ctx } from './store.js';
import * as All from './all.js';
import { CROPS } from './data.js';
import { now, save } from './state.js';
import { toast, setTakeoutNote, takeoutNote } from './witch.js';
import { renderStatus } from './render.js';
import { openModal, closeModal } from './shop.js';

// ============================================================================
// 1. BẢNG MÀU ẨM THỰC CHUYÊN DỤNG (CULINARY PIXEL PALETTE)
// ============================================================================
export const COOKING_P = {
    '.': null,                     // Trong suốt
    'K': '#231815', 'k': '#3a2923', // Viền tối / Đồ gốm đen
    'W': '#ffffff', 'w': '#f5f0eb', // Đĩa sứ trắng / Khói bốc
    'S': '#dcd0c0', 's': '#b8a898', // Đĩa gốm mộc / Khay gỗ
    'R': '#e83e35', 'r': '#b8231c', // Cà chua / Ớt / Sốt đỏ
    'G': '#50b83c', 'g': '#328024', // Rau xanh / Hành lá
    'E': '#8ce060', 'e': '#c8f598', // Mầm cây / Cỏ tươi
    'Y': '#f8cf28', 'y': '#d09f18', // Trứng / Phô mai / Bánh vàng ươm
    'O': '#f08028', 'o': '#b85018', // Thịt nướng / Bì kẹp / Bí ngô
    'B': '#805038', 'b': '#503020', // Nước dùng đậm / Xương hầm
    'P': '#d880b0', 'p': '#a04880', // Thịt hồng / Dâu tây
    'V': '#9050c0', 'v': '#602888', // Linh khí đột biến / Khoai tím
    'C': '#70d0e0', 'c': '#3090a0', // Nước suối lỏng / Đá lạnh
    'F': '#e0f0f5', 'f': '#a0c0d0', // Tô bát thủy tinh
    'M': '#605850', 'm': '#403830', // Nồi đất / Nồi gang
};

// ============================================================================
// 2. MA TRẬN SPRITE PIXEL DÀNH RIÊNG CHO MÓN ĂN & NÚT BẤM (16x16 / 24x24)
// ============================================================================
export const COOKING_SPRITES = {
    // 🍳 SPRITE NÚT BẤM THANH CÔNG CỤ (NỒI NẤU BỐC KHÓI 16x16)
    kitchenIcon: [
        "................",
        "......ww........",
        ".....w..w.......",
        "......ww........",
        "....kkMMkk......",
        "...kMMMMMMk.....",
        "..kMMMMMMMMk....",
        "..kMooooooMk....",
        "..kMoOOOOoMk....",
        "..kMoOOOOoMk....",
        "..kMooooooMk....",
        "..kMMMMMMMMk....",
        "...kMMMMMMk.....",
        "....kkKKkk......",
        ".....k..k.......",
        "................"
    ],

    // 🥗 Salad Cherry Tươi (16x16)
    salad_cherry: [
        "................",
        ".....SSSSSS.....",
        "...SSwwwwwwSS...",
        "..SwwwwwwwwwwS..",
        ".SwwGgEEgGGwwS..",
        ".SwGEGgRrGgEwS..",
        ".SwgRrGEGrRgSw..",
        ".SwGgEGrRgEGwS..",
        ".SwgGEGrRgEgSw..",
        ".SwwgGEEgGGwwS..",
        "..SwwwwwwwwwwS..",
        "...SSwwwwwwSS...",
        ".....SSSSSS.....",
        "................",
        "................",
        "................"
    ],

    // 🍅 Súp Cà Chua Trứng Mây (16x16)
    soup_tomato: [
        "................",
        "......wwww......",
        ".....w....w.....",
        "....mmmmmmmm....",
        "...mRRRRRRRRm...",
        "..mRRyYRRRyYRm..",
        "..mRyYYRRyYYRm..",
        "..mRRRRRRRRRRm..",
        "..mRRgGRRRgGRm..",
        "..mRRRRRRRRRRm..",
        "...mRRRRRRRRm...",
        "....mmmmmmmm....",
        ".....KKKKKK.....",
        "................",
        "................",
        "................"
    ],

    // 🍲 Lẩu Củ Sen Đầm Lầy (24x24)
    hotpot_lotus: [
        "........................",
        ".........wwww...........",
        "........w....w..........",
        ".......wwww.ww..........",
        "......w......w..........",
        ".....mmmmmmmmmmmm.......",
        "....mMMMMMMMMMMMMm......",
        "...mMBBBBBBBBBBBBMm.....",
        "..mMBBoWWBBoWWBBBMm.....",
        "..mMBWwwWWsWwwWWBMm.....",
        "..mMBWwGgWsWgGWWBMm.....",
        "..mMBBoWWBBoWWBBBMm.....",
        "..mMBBBBBRRRBBBBBMm.....",
        "..mMBBGgBRRRgGBBBMm.....",
        "...mMBBBBBBBBBBBBMm.....",
        "....mMMMMMMMMMMMMm......",
        ".....mmmmmmmmmmmm.......",
        "......kKKKKKKKKk........",
        "......kK......Kk........",
        ".....kKK......KKk.......",
        "........................",
        "........................",
        "........................",
        "........................"
    ],

    // 🥧 Bánh Bí Ngô Ánh Trăng (16x16)
    pie_pumpkin: [
        "................",
        "......OOOO......",
        "....OOoYYoOO....",
        "...OoYYYYYYoO...",
        "..OoYYyYYyYYoO..",
        ".OoYYyYWWyYYoO.",
        ".OoYYYWWWYYYoO.",
        ".OoYYyYWWyYYoO.",
        ".OoYYYYYYYYYoO.",
        "..OoYYYYYYYoO..",
        "...OoYYYYYoO...",
        "....OOoYYoOO....",
        "......OOOO......",
        "................",
        "................",
        "................"
    ],

    // 🍖 Sườn Rồng Sốt Quả Long Tinh (24x24)
    dragon_ribs: [
        "........................",
        "........................",
        "..........VV............",
        ".........vVVv...........",
        "........vVVVVv..........",
        ".........vVVv...........",
        "..........VV............",
        ".......oOOOOOOo.........",
        "......oOooRRooOo........",
        ".....oOoRRRRRRoOo.......",
        "....oOoRRwwRRRoOo.......",
        "...sSoOoRRRRRRoOoSs.....",
        "..sSWsOoRRRRRRoOoSWs....",
        "..sSssOoRRRRRRoOosSs....",
        "...sSoOoRRRRRRoOoSs.....",
        "....oOoRRRRRRoOo........",
        ".....oOoRRRRRoOo........",
        "......oOooRRooOo........",
        ".......oOOOOOOo.........",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................"
    ],

    // 🍜 Ramen Linh Khí Đột Biến (24x24)
    mutant_ramen: [
        "........................",
        "..........ww............",
        ".........w..w...........",
        "........w....w..........",
        ".......ww..ww...........",
        "......FFFFFFFF..........",
        ".....FfffffffffF........",
        "....FfVVVVVVVVffF.......",
        "...FfVVYYVVYYVVffF......",
        "..FfVVYWWVYWWVVVffF.....",
        "..FfVVVVYYVVYYVVVffF....",
        "..FfVVGGVVpPVVVVffF.....",
        "..FfVVGGVpPPPVVVffF.....",
        "..FfVVVVVVpPVVVVffF.....",
        "...FfVVVVVVVVVVffF......",
        "....FffffffffffF........",
        ".....FFFFFFFFFF.........",
        "......kkkkkkkk..........",
        "......kK....Kk..........",
        ".....kKK....KKk.........",
        "........................",
        "........................",
        "........................",
        "........................"
    ],

    // 🍡 Chè Củ Năng Ánh Tuyết (16x16)
    sweet_soup: [
        "................",
        "......ffff......",
        ".....fCCCCf.....",
        "....fCCWWCCf....",
        "...fCWYyYWCf...",
        "..fCYyYyYyYCf..",
        "..fCYyWWYyYCf..",
        "..fCYyYyYyYCf..",
        "..fCCYYYYCCf..",
        "...fCCCCCCCCf...",
        "....fCCCCCCf....",
        ".....ffffff.....",
        "......SSSS......",
        "................",
        "................",
        "................"
    ],

    // 💩 Thức Ăn Thất Bại Dị Dạng (16x16)
    failed_dish: [
        "................",
        ".......ww.......",
        "......w..w......",
        ".......vv.......",
        "......vvvv......",
        ".....vVvVvv.....",
        "....vVvVVvVv....",
        "....vVVvvVVv....",
        "...vVvVVVVvVv...",
        "..vVVvVVVVvvVv..",
        "..vvvvvvvvvvvv..",
        "...SSSSSSSSSS...",
        "................",
        "................",
        "................"
    ]
};

// ============================================================================
// 3. RECIPES & DISH DATABASE (DANH SÁCH CÔNG THỨC & BUFF)
// ============================================================================
export const COOKING_RECIPES = {
    salad_cherry: {
        id: 'salad_cherry',
        name: 'Salad Cherry Tươi',
        category: 'starter',
        desc: 'Món khai vị giòn ngọt thanh mát. Tăng 20% tốc độ mọc cây trang Đồng Cỏ trong 1 giờ.',
        ingredients: { radish: 2, douya: 2 },
        cookTime: 5,
        reqLevel: 1,
        sellPrice: 120,
        buff: { type: 'crop_speed', zone: 1, val: 0.8, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +20% (Đồng cỏ)' }
    },
    soup_tomato: {
        id: 'soup_tomato',
        name: 'Súp Cà Chua Trứng Mây',
        category: 'starter',
        desc: 'Bát súp nóng hổi bốc khói. Hồi 30% Max HP cho toàn đội Pet khi đi Dungeon & Thám Hiểm.',
        ingredients: { tomato: 3, dreamG: 1 },
        cookTime: 10,
        reqLevel: 1,
        sellPrice: 280,
        buff: { type: 'pet_heal', val: 0.3, durationMs: 0, desc: 'Hồi 30% Max HP cho Pet' }
    },
    sweet_soup: {
        id: 'sweet_soup',
        name: 'Chè Củ Năng Ánh Tuyết',
        category: 'starter',
        desc: 'Chè ngọt dịu thơm phức. Tăng 20% Tỉ lệ Chí Mạng (Crit Rate) cho Pet trong Thám Hiểm.',
        ingredients: { biqi: 3, douya: 2 },
        cookTime: 8,
        reqLevel: 2,
        sellPrice: 350,
        buff: { type: 'hero_crit', val: 0.2, durationMs: 30 * 60 * 1000, desc: 'Pet +20% Crit Rate trong 30p' }
    },
    hotpot_lotus: {
        id: 'hotpot_lotus',
        name: 'Lẩu Củ Sen Đầm Lầy',
        category: 'water',
        desc: 'Nồi lẩu đậm đà thơm nức. Tăng 25% giá bán mọi nông sản bán ra trong 2 giờ.',
        ingredients: { lianou: 2, biqi: 2, lingjiao: 2 },
        cookTime: 15,
        reqLevel: 3,
        sellPrice: 1800,
        buff: { type: 'sell_price_boost', val: 1.25, durationMs: 2 * 60 * 60 * 1000, desc: 'Tăng +25% Giá bán nông sản' }
    },
    pie_pumpkin: {
        id: 'pie_pumpkin',
        name: 'Bánh Bí Ngô Ánh Trăng',
        category: 'main',
        desc: 'Bánh nướng vàng ươm tỏa ngát hương thơm. Tăng 15% tỷ lệ rơi Mảnh Ngôi Sao/Lăng Quang khi Pet tìm kho báu.',
        ingredients: { pumpkin: 2, moonberry: 2 },
        cookTime: 20,
        reqLevel: 4,
        sellPrice: 2500,
        buff: { type: 'treasure_boost', val: 1.15, durationMs: 2 * 60 * 60 * 1000, desc: 'Pet tìm Kho Báu may mắn +15%' }
    },
    dragon_ribs: {
        id: 'dragon_ribs',
        name: 'Sườn Rồng Sốt Long Tinh',
        category: 'gourmet',
        desc: 'Món ăn vương giả tràn đầy năng lượng. Tăng +40% ATK & +20% Max HP cho Pet trong Thám Hiểm.',
        ingredients: { dragoncry: 1, starbush: 2, gemflower: 1 },
        cookTime: 30,
        reqLevel: 5,
        sellPrice: 8500,
        buff: { type: 'hero_stats_boost', atkVal: 1.4, hpVal: 1.2, durationMs: 3 * 60 * 60 * 1000, desc: 'Pet +40% ATK & +20% HP (3 giờ)' }
    },
    mutant_ramen: {
        id: 'mutant_ramen',
        name: 'Ramen Linh Khí Đột Biến',
        category: 'mutant',
        desc: 'Món tô ramen bốc linh khí ảo diệu. Khi đem vào Story Chat (Takeout), nhân vật AI sẽ cực kỳ vui vẻ và hưng phấn.',
        ingredients: { wujing: 2, opalvine: 1, dreamM: 1 },
        cookTime: 25,
        reqLevel: 5,
        sellPrice: 6000,
        buff: { type: 'rp_story_boost', val: 1, durationMs: 4 * 60 * 60 * 1000, desc: 'Món quà linh khí tuyệt hảo cho RP' }
    },
    failed_dish: {
        id: 'failed_dish',
        name: 'Thức Ăn Thất Bại Dị Dạng',
        category: 'failed',
        desc: 'Hỗn hợp bốc khói đen tấu hài do kết hợp sai nguyên liệu. Có thể đem làm phân bón cây!',
        ingredients: {},
        cookTime: 3,
        reqLevel: 1,
        sellPrice: 10,
        buff: { type: 'none', val: 0, durationMs: 0, desc: 'Không có hiệu ứng đặc biệt' }
    }
};

// ============================================================================
// 4. HÀM RENDER SPRITE MÓN ĂN VÀ STATE KHO BẾP
// ============================================================================

/**
 * Trả về chuỗi HTML <img> render SVG Pixel Art cho món ăn hoặc icon bếp
 */
export function dishSVG(dishId, px = 32) {
    const matrix = COOKING_SPRITES[dishId] || COOKING_SPRITES.failed_dish;
    const canvas = document.createElement('canvas');
    const height = matrix.length;
    const width = matrix[0].length;
    canvas.width = width;
    canvas.height = height;
    const ctx2d = canvas.getContext('2d');

    for (let y = 0; y < height; y++) {
        const row = matrix[y];
        for (let x = 0; x < width; x++) {
            const char = row[x];
            const color = COOKING_P[char];
            if (color) {
                ctx2d.fillStyle = color;
                ctx2d.fillRect(x, y, 1, 1);
            }
        }
    }

    return `<img draggable="false" width="${px}" height="${px}" src="${canvas.toDataURL('image/png')}" style="display:block; image-rendering:pixelated; object-fit:contain;" />`;
}

/**
 * Khởi tạo dữ liệu Bếp Nấu trong ctx.S
 */
export function initCookingState() {
    if (!ctx.S.cooking) {
        ctx.S.cooking = {
            chefLevel: 1,
            chefExp: 0,
            unlockedRecipes: ['salad_cherry', 'soup_tomato'],
            activeBuffs: [],
            stovesCount: 1,
        };
    }
    if (!ctx.S.cooking.unlockedRecipes) {
        ctx.S.cooking.unlockedRecipes = ['salad_cherry', 'soup_tomato'];
    }
    if (!ctx.S.cooking.activeBuffs) {
        ctx.S.cooking.activeBuffs = [];
    }
}

/**
 * Lấy danh sách Buff ẩm thực đang còn hiệu lực
 */
export function getActiveCookingBuffs() {
    initCookingState();
    const nowMs = now();
    ctx.S.cooking.activeBuffs = ctx.S.cooking.activeBuffs.filter(b => b.expiresAt > nowMs);
    return ctx.S.cooking.activeBuffs;
}

/**
 * Kiểm tra xem người chơi có đủ nguyên liệu để nấu không
 */
export function canCookRecipe(recipeId) {
    const recipe = COOKING_RECIPES[recipeId];
    if (!recipe) return false;
    for (const [ingId, reqAmount] of Object.entries(recipe.ingredients)) {
        const bagAmount = ctx.S.bag[ingId] || 0;
        if (bagAmount < reqAmount) return false;
    }
    return true;
}

/**
 * Thực hiện Nấu theo Công thức
 */
export function cookRecipe(recipeId) {
    initCookingState();
    const recipe = COOKING_RECIPES[recipeId];
    if (!recipe) return toast('Công thức không tồn tại!');

    if (ctx.S.cooking.chefLevel < recipe.reqLevel) {
        return toast(`Cần cấp Đầu Bếp Lv.${recipe.reqLevel} để nấu món này!`);
    }

    if (!canCookRecipe(recipeId)) {
        return toast('Thiếu nguyên liệu trong Balo!');
    }

    // Trừ nguyên liệu
    for (const [ingId, reqAmount] of Object.entries(recipe.ingredients)) {
        ctx.S.bag[ingId] -= reqAmount;
        if (ctx.S.bag[ingId] <= 0) delete ctx.S.bag[ingId];
    }

    // Thêm món ăn vào túi đồ dưới dạng food@id
    const foodKey = `food@${recipeId}`;
    ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;

    // Cộng EXP đầu bếp
    const expGain = recipe.cookTime * 10;
    ctx.S.cooking.chefExp += expGain;
    const reqExp = ctx.S.cooking.chefLevel * 100;
    if (ctx.S.cooking.chefExp >= reqExp) {
        ctx.S.cooking.chefLevel++;
        ctx.S.cooking.chefExp -= reqExp;
        toast(`🎉 CHÚC MỪNG! Đã thăng cấp Đầu Bếp lên Lv.${ctx.S.cooking.chefLevel}!`);
    } else {
        toast(`🍳 Đã nấu thành công ${recipe.name}! (+${expGain} EXP)`);
    }

    save();
    renderStatus();
    openKitchenModal();
}

/**
 * Thử nghiệm Sáng tạo (Free Fusion Cooking)
 */
export function cookFreeFusion(ingredientList) {
    initCookingState();
    if (!ingredientList || ingredientList.length === 0) {
        return toast('Hãy chọn ít nhất 1 nguyên liệu!');
    }

    // Kiểm tra số lượng
    const countMap = {};
    for (const ingId of ingredientList) {
        countMap[ingId] = (countMap[ingId] || 0) + 1;
        if ((ctx.S.bag[ingId] || 0) < countMap[ingId]) {
            return toast('Không đủ nguyên liệu trong Balo!');
        }
    }

    // Trừ nguyên liệu
    for (const [ingId, amt] of Object.entries(countMap)) {
        ctx.S.bag[ingId] -= amt;
        if (ctx.S.bag[ingId] <= 0) delete ctx.S.bag[ingId];
    }

    // Đối chiếu công thức
    let matchedRecipeId = null;
    for (const [rId, recipe] of Object.entries(COOKING_RECIPES)) {
        if (rId === 'failed_dish') continue;
        const ingKeys = Object.keys(recipe.ingredients);
        if (ingKeys.length === Object.keys(countMap).length) {
            const match = ingKeys.every(k => recipe.ingredients[k] === countMap[k]);
            if (match) {
                matchedRecipeId = rId;
                break;
            }
        }
    }

    if (matchedRecipeId) {
        const recipe = COOKING_RECIPES[matchedRecipeId];
        const foodKey = `food@${matchedRecipeId}`;
        ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;

        if (!ctx.S.cooking.unlockedRecipes.includes(matchedRecipeId)) {
            ctx.S.cooking.unlockedRecipes.push(matchedRecipeId);
            toast(`🌟 KỲ TÍCH! Bạn đã tự khám phá ra Công thức mới: ${recipe.name}!`);
        } else {
            toast(`✨ Sáng tạo thành công món: ${recipe.name}!`);
        }
        ctx.S.cooking.chefExp += recipe.cookTime * 15;
    } else {
        // Nấu thất bại
        const foodKey = `food@failed_dish`;
        ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;
        toast(`💩 Thất bại rồi! Món ăn biến thành Thức Ăn Dị Dạng...`);
        ctx.S.cooking.chefExp += 10;
    }

    save();
    renderStatus();
    openKitchenModal();
}

/**
 * Thưởng thức Món ăn để kích hoạt Buff
 */
export function eatDish(foodKey) {
    initCookingState();
    const dishId = foodKey.replace('food@', '');
    const recipe = COOKING_RECIPES[dishId];
    if (!recipe) return toast('Món ăn không hợp lệ!');

    if ((ctx.S.bag[foodKey] || 0) <= 0) return toast('Bạn không có món ăn này!');

    // Trừ 1 món
    ctx.S.bag[foodKey]--;
    if (ctx.S.bag[foodKey] <= 0) delete ctx.S.bag[foodKey];

    // Xử lý Buff đặc biệt
    const buff = recipe.buff;
    if (buff.type === 'pet_heal') {
        if (All.runState && All.runState.pets) {
            All.runState.pets.forEach(p => {
                if (p.hp > 0) p.hp = Math.min(p.maxHp, p.hp + p.maxHp * buff.val);
            });
            toast(`💚 Đã hồi ${buff.val * 100}% HP cho toàn đội Pet!`);
        } else {
            toast(`💚 Món ăn bổ dưỡng! Pet của bạn đã sẵn sàng cho trận chiến tiếp theo.`);
        }
    } else if (buff.type !== 'none') {
        const expiresAt = now() + buff.durationMs;
        ctx.S.cooking.activeBuffs.push({
            dishId,
            name: recipe.name,
            type: buff.type,
            val: buff.val,
            atkVal: buff.atkVal,
            hpVal: buff.hpVal,
            desc: buff.desc,
            expiresAt
        });
        toast(`😋 Đã thưởng thức ${recipe.name}! Kích hoạt Buff: ${buff.desc}`);
    } else {
        toast(`💩 Bạn đã ăn... Món Ăn Dị Dạng. Mùi vị thật khó tả!`);
    }

    save();
    renderStatus();
    openKitchenModal();
}

// ============================================================================
// 5. GIAO DIỆN CỬA SỔ NHÀ BẾP (KITCHEN UI MODAL)
// ============================================================================
let activeKitchenTab = 'recipes'; // 'recipes' | 'fusion' | 'buffs'

export function openKitchenModal() {
    initCookingState();
    const cooking = ctx.S.cooking;
    const activeBuffs = getActiveCookingBuffs();

    // Header cấp độ
    const headerHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.06); padding:10px 14px; border-radius:8px; margin-bottom:12px;">
      <div style="font-weight:bold; font-size:14px; color:#7a5c38;">
        👨‍🍳 Cấp Đầu Bếp: <span style="color:#d32f2f;">Lv.${cooking.chefLevel}</span>
      </div>
      <div style="font-size:12px; color:#8d6e63;">
        EXP: ${cooking.chefExp} / ${cooking.chefLevel * 100}
      </div>
    </div>
    <div class="tabs">
      <span class="tab ${activeKitchenTab === 'recipes' ? 'active' : ''}" id="tab-cook-recipes">Sách Công Thức</span>
      <span class="tab ${activeKitchenTab === 'fusion' ? 'active' : ''}" id="tab-cook-fusion">Sáng Tạo Free Fusion</span>
      <span class="tab ${activeKitchenTab === 'buffs' ? 'active' : ''}" id="tab-cook-buffs">Buffs Đang Bật (${activeBuffs.length})</span>
    </div>
  `;

    let bodyHtml = '';

    if (activeKitchenTab === 'recipes') {
        // Render Sách Công Thức
        let recipeRows = '';
        for (const [rId, recipe] of Object.entries(COOKING_RECIPES)) {
            if (rId === 'failed_dish') continue;
            const isUnlocked = cooking.unlockedRecipes.includes(rId);
            const isLevelMet = cooking.chefLevel >= recipe.reqLevel;
            const hasIngredients = canCookRecipe(rId);

            // Render danh sách nguyên liệu
            let ingHtml = '';
            for (const [ingId, reqAmt] of Object.entries(recipe.ingredients)) {
                const cropDef = CROPS[ingId] || { name: ingId };
                const haveAmt = ctx.S.bag[ingId] || 0;
                const color = haveAmt >= reqAmt ? '#2e7d32' : '#c62828';
                ingHtml += `<span style="color:${color}; margin-right:8px; font-size:11px;">${cropDef.name}: ${haveAmt}/${reqAmt}</span>`;
            }

            const icon = isUnlocked ? dishSVG(rId, 36) : `<div style="font-size:24px; color:#aaa;">❓</div>`;
            const nameStr = isUnlocked ? recipe.name : `??? (Cần Lv.${recipe.reqLevel})`;
            const descStr = isUnlocked ? recipe.desc : `Món ăn chưa được khám phá.`;

            recipeRows += `
        <div class="item" style="opacity: ${isLevelMet ? 1 : 0.6};">
          <div class="icon">${icon}</div>
          <div class="info">
            <div class="name">${nameStr}</div>
            <div class="meta">${descStr}</div>
            ${isUnlocked ? `<div style="margin-top:3px;">${ingHtml}</div>` : ''}
          </div>
          <div class="acts">
            ${isUnlocked ? `
              <button class="buy ${hasIngredients ? '' : 'off'}" data-cook="${rId}">
                Nấu
              </button>
            ` : `
              <span class="buy off">Khóa</span>
            `}
          </div>
        </div>
      `;
        }
        bodyHtml = `<div class="items">${recipeRows}</div>`;
    } else if (activeKitchenTab === 'fusion') {
        // Render Bếp Sáng Tạo (Free Fusion)
        let bagCrops = '';
        for (const [bKey, amt] of Object.entries(ctx.S.bag)) {
            if (amt > 0 && CROPS[bKey]) {
                bagCrops += `
          <div class="pick" data-add-ing="${bKey}" style="cursor:pointer; padding:6px 10px;">
            ${CROPS[bKey].name} (x${amt})
          </div>
        `;
            }
        }

        bodyHtml = `
      <div class="note" style="margin-bottom:10px;">
        🔥 <b>Bếp Thử Nghiệm:</b> Thả nguyên liệu bất kỳ vào Nồi. Nếu kết hợp đúng sẽ tự khám phá Công thức mới!
      </div>
      <div style="background:#fffdf4; border:2px inset #c9a273; border-radius:8px; padding:12px; margin-bottom:12px; min-height:60px;">
        <div style="font-size:12px; font-weight:bold; color:#7a5c38; margin-bottom:6px;">Nguyên liệu trong nồi:</div>
        <div id="fusion-pot" style="display:flex; gap:8px; flex-wrap:wrap; min-height:30px;">
          <span style="color:#aaa; font-size:12px; font-style:italic;">(Chưa chọn nguyên liệu nào)</span>
        </div>
      </div>
      <div style="font-size:12px; font-weight:bold; color:#7a5c38; margin-bottom:6px;">Chọn từ Túi đồ:</div>
      <div class="picker" style="max-height:120px; overflow-y:auto;">
        ${bagCrops || '<div style="color:#aaa; font-size:12px;">Không có nông sản nào trong Balo!</div>'}
      </div>
      <div style="margin-top:14px; text-align:center;">
        <button class="buy" id="btn-start-fusion" style="padding:10px 24px; font-size:14px;">🍳 Bật Bếp Nấu Thử!</button>
      </div>
    `;
    } else if (activeKitchenTab === 'buffs') {
        // Render danh sách Buff đang hoạt động
        let buffRows = '';
        if (activeBuffs.length === 0) {
            buffRows = `<div class="note" style="text-align:center; padding:20px;">Hiện không có Buff ẩm thực nào đang hoạt động. Hãy thưởng thức món ăn để nhận Buff!</div>`;
        } else {
            const nowMs = now();
            for (const buff of activeBuffs) {
                const remSec = Math.max(0, Math.floor((buff.expiresAt - nowMs) / 1000));
                const minStr = Math.floor(remSec / 60);
                const secStr = remSec % 60;
                buffRows += `
          <div class="item">
            <div class="icon">${dishSVG(buff.dishId, 32)}</div>
            <div class="info">
              <div class="name" style="color:#2e7d32;">${buff.name}</div>
              <div class="meta">${buff.desc}</div>
            </div>
            <div style="font-weight:bold; font-size:13px; color:#d32f2f;">
              ⏱️ ${minStr}m ${secStr}s
            </div>
          </div>
        `;
            }
        }
        bodyHtml = `<div class="items">${buffRows}</div>`;
    }

    openModal('Nhà Bếp Nông Trại 🍳', headerHtml + bodyHtml);

    // Event Listeners cho Tab
    All.$id('tab-cook-recipes')?.addEventListener('click', () => { activeKitchenTab = 'recipes'; openKitchenModal(); });
    All.$id('tab-cook-fusion')?.addEventListener('click', () => { activeKitchenTab = 'fusion'; openKitchenModal(); });
    All.$id('tab-cook-buffs')?.addEventListener('click', () => { activeKitchenTab = 'buffs'; openKitchenModal(); });

    // Handle Nấu theo công thức
    All.$id('mbody')?.querySelectorAll('[data-cook]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rId = e.currentTarget.dataset.cook;
            cookRecipe(rId);
        });
    });

    // Handle Fusion Pot Selection
    const fusionSelected = [];
    const potEl = All.$id('fusion-pot');
    All.$id('mbody')?.querySelectorAll('[data-add-ing]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ingId = e.currentTarget.dataset.addIng;
            if (fusionSelected.length >= 4) return toast('Tối đa 4 nguyên liệu một lần!');
            fusionSelected.push(ingId);

            // Render lại nồi
            potEl.innerHTML = fusionSelected.map((id, idx) => `
        <span class="buy plain" data-remove-fusion="${idx}" style="padding:3px 8px; font-size:11px;">
          ${CROPS[id]?.name || id} ✕
        </span>
      `).join('');

            // Add remove handlers
            potEl.querySelectorAll('[data-remove-fusion]').forEach(remBtn => {
                remBtn.addEventListener('click', (re) => {
                    const rIdx = parseInt(re.currentTarget.dataset.removeFusion);
                    fusionSelected.splice(rIdx, 1);
                    re.currentTarget.remove();
                });
            });
        });
    });

    // Handle Fusion Submit
    All.$id('btn-start-fusion')?.addEventListener('click', () => {
        cookFreeFusion(fusionSelected);
    });
}

// ============================================================================
// 6. CƠ CHẾ TỰ ĐỘNG TIÊM GIAO DIỆN (AUTO-UI INJECTION & DYNAMIC REGISTRATION)
// ============================================================================

/**
 * Tự động chèn Nút Nấu Ăn vào Thanh Công Cụ Dưới (.bottombar)
 */
export function injectCookingButton() {
    const shadowRoot = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
    if (!shadowRoot) return;

    const bottombar = shadowRoot.querySelector('.bottombar');
    if (bottombar && !shadowRoot.querySelector('[data-open="cooking"]')) {
        const btn = document.createElement('div');
        btn.className = 'btn';
        btn.dataset.open = 'cooking';
        btn.innerHTML = `${dishSVG('kitchenIcon', 22)}Nấu ăn`;
        btn.addEventListener('click', () => openKitchenModal());

        // Chèn vào trước nút Cài đặt (nút cuối)
        const cfgBtn = bottombar.querySelector('[data-open="cfg"]');
        if (cfgBtn) {
            bottombar.insertBefore(btn, cfgBtn);
        } else {
            bottombar.appendChild(btn);
        }
    }

    // Tiêm Ô Nhà Bếp vào Chế độ Khám phá (Explore Mode)
    const expBlocks = shadowRoot.querySelector('#explore-blocks');
    if (expBlocks && !shadowRoot.querySelector('#eslot-cooking')) {
        const expSlot = document.createElement('div');
        expSlot.className = 'explore-slot';
        expSlot.id = 'eslot-cooking';
        expSlot.style.cssText = 'background: rgba(220, 100, 50, 0.8); border-color: #ff8a65; box-shadow: 0 4px 0 #d84315, inset 0 0 0 3px rgba(255,138,101,0.4);';
        expSlot.innerHTML = `
      ${dishSVG('kitchenIcon', 48)}
      <div class="feature-name" style="color: #fff8e1; text-shadow: 0 1px 2px #000;">Nhà Bếp</div>
    `;
        expSlot.addEventListener('click', () => openKitchenModal());
        expBlocks.appendChild(expSlot);
    }
}

// Tự động kích hoạt Observer để chắc chắn Nút Nấu Ăn luôn có mặt kể cả khi UI Re-render
if (typeof window !== 'undefined') {
    const tryInject = () => {
        initCookingState();
        injectCookingButton();
    };

    // Thử tiêm ngay lập tức
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInject);
    } else {
        setTimeout(tryInject, 500);
        setTimeout(tryInject, 1500);
    }

    // Theo dõi sự thay đổi của Shadow DOM để tiêm lại khi UI re-render
    const observer = new MutationObserver(() => {
        injectCookingButton();
    });

    setTimeout(() => {
        const shadowRoot = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
        if (shadowRoot) {
            observer.observe(shadowRoot, { childList: true, subtree: true });
        }
    }, 1000);
}
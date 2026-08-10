import { ctx } from './store.js';
import * as All from './all.js';
import { CROPS } from './data.js';
import { now, save } from './state.js';
import { toast, setTakeoutNote, takeoutNote } from './witch.js';
import { renderStatus } from './render.js';
import { openModal, closeModal } from './shop.js';

export const COOKING_P = {
    '.': null,                     // Trong suốt
    'K': '#231815', 'k': '#3a2923', // Viền tối / Đồ gốm đen
    'W': '#ffffff', 'w': '#f5f0eb', // Đĩa sứ trắng / Khói bốc
    'S': '#dcd0c0', 's': '#b8a898', // Đĩa gốm mộc / Khay gỗ
    'R': '#e83e35', 'r': '#b8231c', // Cà chua / Ớt / Sốt đỏ / Trái cây
    'G': '#50b83c', 'g': '#328024', // Rau xanh / Hành lá
    'E': '#8ce060', 'e': '#c8f598', // Mầm cây / Cỏ tươi
    'Y': '#f8cf28', 'y': '#d09f18', // Trứng / Phô mai / Chiên giòn
    'O': '#f08028', 'o': '#b85018', // Thịt nướng / Bí ngô / Đất nung
    'B': '#805038', 'b': '#503020', // Nước dùng đậm / Xương hầm / Trà
    'P': '#d880b0', 'p': '#a04880', // Thịt hồng / Dâu tây
    'V': '#9050c0', 'v': '#602888', // Linh khí đột biến / Trà tím
    'C': '#70d0e0', 'c': '#3090a0', // Nước suối lỏng / Đá lạnh / Nước lấp lánh
    'F': '#e0f0f5', 'f': '#a0c0d0', // Tô bát thủy tinh / Sứ xanh
    'M': '#605850', 'm': '#403830', // Nồi đất / Nồi gang
    'A': '#ffd94d', 'a': '#ffb300', // Vàng lấp lánh / Ánh sao
};

export const COOKING_SPRITES = {
    // 🍳 NÚT BẤM THANH CÔNG CỤ
    kitchenIcon: [
        "................", "......ww........", ".....w..w.......", "......ww........",
        "....kkMMkk......", "...kMMMMMMk.....", "..kMMMMMMMMk....", "..kMooooooMk....",
        "..kMoOOOOoMk....", "..kMoOOOOoMk....", "..kMooooooMk....", "..kMMMMMMMMk....",
        "...kMMMMMMk.....", "....kkKKkk......", ".....k..k.......", "................"
    ],

    // 1. Salad Cherry Tươi
    salad_cherry: [
        "................", ".....SSSSSS.....", "...SSwwwwwwSS...", "..SwwwwwwwwwwS..",
        ".SwwGgEEgGGwwS..", ".SwGEGgRrGgEwS..", ".SwgRrGEGrRgSw..", ".SwGgEGrRgEGwS..",
        ".SwgGEGrRgEgSw..", ".SwwgGEEgGGwwS..", "..SwwwwwwwwwwS..", "...SSwwwwwwSS...",
        ".....SSSSSS.....", "................", "................", "................"
    ],

    // 2. Súp Cà Chua Trứng Mây
    soup_tomato: [
        "................", "......wwww......", ".....w....w.....", "....mmmmmmmm....",
        "...mRRRRRRRRm...", "..mRRyYRRRyYRm..", "..mRyYYRRyYYRm..", "..mRRRRRRRRRRm..",
        "..mRRgGRRRgGRm..", "..mRRRRRRRRRRm..", "...mRRRRRRRRm...", "....mmmmmmmm....",
        ".....KKKKKK.....", "................", "................", "................"
    ],

    // 3. Chả Giò Giá Đỗ Chiên Giòn
    spring_rolls: [
        "................", "......wwww......", "....ww....ww....", "..wwwSSSSSSwww..",
        ".wwSSWWWWWWSSww.", ".wSWWyYYyYYWWSw.", ".wSWyyyyyyyyWSw.", ".wSWyYYoYYoYWSw.",
        ".wSWyyyyyyyyWSw.", ".wSWWWWWWWWWWSw.", ".wwSSSSSSSSSSww.", "..www......www..",
        "....ww....ww....", "......wwww......", "................", "................"
    ],

    // 4. Canh Củ Cải Rong Tảo
    radish_soup: [
        "................", ".......w........", "......w.w.......", ".....w...w......",
        "...ffffffffff...", "..fWWWWWWWWWWf..", ".fWWgGWWgGWWWWf.", ".fWWrRWWPPWWWWf.",
        ".fWWRrWWppWWgGf.", ".fWWWWWWWWWWWWf.", ".fWWgGWWgGWWWWf.", "..fWWWWWWWWWWf..",
        "...ffffffffff...", "....fFFFFFFf....", ".....ffffff.....", "................"
    ],

    // 5. Kẹo Hồ Lô Dâu Tây
    candied_strawberry: [
        "................", ".......ww.......", "......wRRw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", "......wbbw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", "......wbbw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", ".......bb.......", ".......bb......."
    ],

    // 6. Chè Củ Năng Củ Ấu
    sweet_soup: [
        "................", "......ffff......", ".....fCCCCf.....", "....fCCWWCCf....",
        "...fCWYyYWCf...", "..fCYyYyyYyYCf..", "..fCYyWkKyYCf..", "..fCYyYyyYyYCf..",
        "..fCCYYYYCCf..", "...fCCCCCCCCf...", "....fCCCCCCf....", ".....ffffff.....",
        "......SSSS......", "................", "................", "................"
    ],

    // 7. Củ Niễng Xào Thịt
    stir_fry_jiaobai: [
        ".......w........", "......w.w.......", "....mmmmmmmm....", "...mKKKKKKKKm...",
        "..mKeeoOooeeKm..", ".mKeEEoOOoEEeKm.", ".mKeeoOOOOoeeKm.", ".mKEEEEooEEEEKm.",
        ".mKeeoOooOOeeKm.", "..mKKKKKKKKKKm..", "...mmmmmmmmmm...", "....mMMMMMMm....",
        "................", "................", "................", "................"
    ],

    // 8. Lẩu Củ Sen Đầm Lầy (16x16)
    hotpot_lotus: [
        ".......w........", ".....ww.ww......", "....mmmmmmmm....", "...mBBBBBBBBm...",
        "..mBwWwBBsSsBm..", ".mBWwGwBsSwsSBm.", ".mBBwWwBBsSsBm..", ".mBRRBBBBBBBRRm.",
        ".mBRrRBBgGBRrRm.", ".mBRRBBBgGBBRRm.", "..mBBBBBBBBBBm..", "...mmmmmmmmmm...",
        "....kKKKKKKk....", ".....k....k.....", "................", "................"
    ],

    // 9. Súp Phát Sáng (Glow Soup)
    glow_soup: [
        ".......A........", "......A.A.......", ".....A...A......", "....KKKKKKKK....",
        "...KCCCCCCCCK...", "..KCcCcAaCcCcK..", ".KCcCAAAAcCCcK.", ".KCcAaCCaACcCcK.",
        ".KCcCcAAcCcCcK.", "..KCCCCCCCCCCK..", "...KKKKKKKKKK...", "....KKKKKKKK....",
        ".....KkkkkK.....", "................", "................", "................"
    ],

    // 10. Hoa Kẹo Mút (Candy Flower)
    candy_flower: [
        "................", "......WWWW......", "....WWPppPWW....", "...WPpPPPpPW....",
        "..WPpPWWWPpPW...", ".WPpPWaaAWPpPW.", ".WPpPWaAaWPpPW.", ".WPpPWaaAWPpPW.",
        "..WPpPWWWPpPW...", "...WPpPPPpPW....", "....WWPppPWW....", "......WWWW......",
        ".......bb.......", ".......bb.......", ".......bb.......", "................"
    ],

    // 11. Trà Dây Leo Opal
    opal_tea: [
        ".......w........", "......w.w.......", ".......w........", ".....FFFFFF.....",
        "....FffffffF....", "...FfCCCCCCfF...", "..FfCCccCCccfF..", "..FfCCcCcCccfF..",
        "..FfCCcCcCccfF..", "..FfCCccCCccfF..", "..FfCCCCCCccfF..", "...FfCCCCCCfF...",
        "....FffffffF....", ".....FFFFFF.....", "................", "................"
    ],

    // 12. Bánh Bí Ngô Ánh Trăng
    pie_pumpkin: [
        "................", "......OOOO......", "....OOoYYoOO....", "...OoYYYYYYoO...",
        "..OoYYvVVvYYoO..", ".OoYvVVWWVvYoO.", ".OoYvVWWWvVYoO.", ".OoYvVVWWVvYoO.",
        ".OoYYvVVvYYYoO.", "..OoYYYYYYYoO..", "...OoYYYYYoO...", "....OOoYYoOO....",
        "......OOOO......", "................", "................", "................"
    ],

    // 13. Sườn Rồng Sốt Quả Long Tinh
    dragon_ribs: [
        ".......V........", "......V.V.......", "....vVVVVv......", "...vWWRRWWv.....",
        "..vWWRrrRWWv....", ".sSwRRrrRRwSs...", "sSWoRRrrRRoWSs..", "sSsoRRrrRRosSs..",
        ".sSwRRrrRRwSs...", "..vWWRrrRWWv....", "...vWWRRWWv.....", "....vVVVVv......",
        "......V.V.......", ".......V........", "................", "................"
    ],

    // 14. Ramen Linh Khí Tiên Thiên
    mutant_ramen: [
        ".......w........", "......w.w.......", ".......w........", "....FFFFFFFF....",
        "...fVVYyYyVVf...", "..fVYyWwWwYyVf..", ".fVYywwPpwwYyVf.", ".fVYywwPPwwYyVf.",
        ".fVYyWwWwWwYyVf.", ".fVVYyYyYyYyVVf.", "..fVVVVVVVVVVf..", "...ffffffffff...",
        "....FFFFFFFF....", ".....kkkkkk.....", "......k..k......", "................"
    ],

    // 15. Thức Ăn Thất Bại Dị Dạng
    failed_dish: [
        "................", ".......ww.......", "......w..w......", ".......vv.......",
        "......vvvv......", ".....vVvVvv.....", "....vVvVVvVv....", "....vVVvvVVv....",
        "...vVvVVVVvVv...", "..vVVvVVVVvvVv..", "..vvvvvvvvvvvv..", "...SSSSSSSSSS...",
        "................", "................", "................", "................"
    ]
};

// ============================================================================
// 3. RECIPES & DISH DATABASE (15 CÔNG THỨC BAO QUÁT TOÀN BỘ NÔNG SẢN)
// ============================================================================
export const COOKING_RECIPES = {
    salad_cherry: {
        name: 'Salad Cherry Tươi', category: 'grass', reqLevel: 1, cookTime: 3, sellPrice: 150,
        desc: 'Giòn ngọt thanh mát. Tăng 20% tốc độ mọc cây trang Đồng Cỏ trong 1 giờ.',
        ingredients: { radish: 2, douya: 2 },
        buff: { type: 'crop_speed', zone: 1, val: 0.8, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +20% (Đồng cỏ)' }
    },
    spring_rolls: {
        name: 'Chả Giò Giá Đỗ', category: 'grass', reqLevel: 1, cookTime: 3, sellPrice: 130,
        desc: 'Vỏ giòn rụm, nhân thơm lừng. Hồi 10% HP cho Pet.',
        ingredients: { douya: 4 },
        buff: { type: 'pet_heal', val: 0.1, durationMs: 0, desc: 'Hồi 10% Max HP cho toàn đội Pet' }
    },
    radish_soup: {
        name: 'Canh Củ Cải Rong Tảo', category: 'water', reqLevel: 2, cookTime: 5, sellPrice: 200,
        desc: 'Thanh lọc cơ thể. Tăng 10% Tốc đánh (SPD) cho Pet trong 30 phút.',
        ingredients: { radish: 2, chuncai: 2 },
        buff: { type: 'hero_speed', val: 0.1, durationMs: 30 * 60 * 1000, desc: 'Pet +10% Tốc đánh' }
    },
    soup_tomato: {
        name: 'Súp Cà Chua Bồng Bềnh', category: 'grass', reqLevel: 2, cookTime: 5, sellPrice: 220,
        desc: 'Bát súp chua ngọt bốc khói. Hồi 30% Max HP cho toàn đội Pet.',
        ingredients: { tomato: 3, douya: 1 },
        buff: { type: 'pet_heal', val: 0.3, durationMs: 0, desc: 'Hồi 30% Max HP cho toàn đội Pet' }
    },
    candied_strawberry: {
        name: 'Kẹo Hồ Lô Dâu Tây', category: 'grass', reqLevel: 2, cookTime: 4, sellPrice: 850,
        desc: 'Ngọt lịm tim. Tăng 10% Tỉ lệ Crit Rate cho Pet trong 30 phút.',
        ingredients: { strawberry: 1, douya: 1 },
        buff: { type: 'hero_crit', val: 0.1, durationMs: 30 * 60 * 1000, desc: 'Pet +10% Crit Rate' }
    },
    sweet_soup: {
        name: 'Chè Củ Năng Củ Ấu', category: 'water', reqLevel: 3, cookTime: 8, sellPrice: 800,
        desc: 'Giải nhiệt xua tan mệt mỏi. Tăng 15% tốc độ mọc cây trang Vùng Nước.',
        ingredients: { biqi: 2, lingjiao: 1 },
        buff: { type: 'crop_speed', zone: 2, val: 0.85, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +15% (Vùng nước)' }
    },
    stir_fry_jiaobai: {
        name: 'Củ Niễng Xào Dòn', category: 'water', reqLevel: 3, cookTime: 8, sellPrice: 1300,
        desc: 'Cực kỳ tốn cơm. Tăng 10% Máu tối đa (Max HP) cho Pet trong 1 giờ.',
        ingredients: { jiaobai: 2, chuncai: 1 },
        buff: { type: 'hero_hp', val: 0.1, durationMs: 60 * 60 * 1000, desc: 'Pet +10% Max HP' }
    },
    hotpot_lotus: {
        name: 'Lẩu Củ Sen Đầm Lầy', category: 'water', reqLevel: 4, cookTime: 12, sellPrice: 3500,
        desc: 'Nồi lẩu đậm đà thơm nức. Tăng 25% giá bán mọi nông sản trong 2 giờ.',
        ingredients: { lianou: 1, biqi: 2, lingjiao: 2 },
        buff: { type: 'sell_price_boost', val: 1.25, durationMs: 2 * 60 * 60 * 1000, desc: 'Tăng +25% Giá bán nông sản' }
    },
    glow_soup: {
        name: 'Súp Tinh Thạch', category: 'mine', reqLevel: 4, cookTime: 12, sellPrice: 1600,
        desc: 'Phát sáng lấp lánh trong đêm. Tăng 20% tốc độ mọc cây trang Khu Mỏ.',
        ingredients: { wujing: 2, starbush: 1 },
        buff: { type: 'crop_speed', zone: 3, val: 0.8, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +20% (Khu mỏ)' }
    },
    candy_flower: {
        name: 'Hoa Kẹo Mút Bảo Thạch', category: 'mine', reqLevel: 5, cookTime: 15, sellPrice: 4000,
        desc: 'Đẹp đến mức không nỡ ăn. Tăng 10% Tỉ lệ rớt Mảnh Ngôi Sao/Lăng Quang khi Pet nhặt kho báu.',
        ingredients: { gemflower: 1, moonberry: 1 },
        buff: { type: 'treasure_boost', val: 1.1, durationMs: 2 * 60 * 60 * 1000, desc: 'Pet nhặt Kho Báu may mắn +10%' }
    },
    opal_tea: {
        name: 'Trà Dây Leo Opal', category: 'mine', reqLevel: 5, cookTime: 15, sellPrice: 2500,
        desc: 'Nước trà xanh ngọc bích. Tăng 20% Tốc độ di chuyển và né tránh cho Pet.',
        ingredients: { opalvine: 1, wujing: 1 },
        buff: { type: 'hero_dodge', val: 0.2, durationMs: 60 * 60 * 1000, desc: 'Pet +20% Né Tránh (Dodge)' }
    },
    pie_pumpkin: {
        name: 'Bánh Bí Ngô Ánh Trăng', category: 'main', reqLevel: 6, cookTime: 20, sellPrice: 3000,
        desc: 'Thơm lừng mùi bơ sữa. Tăng 25% tỷ lệ rơi Gacha Tickets.',
        ingredients: { pumpkin: 2, moonberry: 2 },
        buff: { type: 'ticket_boost', val: 1.25, durationMs: 2 * 60 * 60 * 1000, desc: 'Tỷ lệ rớt vé Gacha +25%' }
    },
    dragon_ribs: {
        name: 'Sườn Rồng Sốt Long Tinh', category: 'gourmet', reqLevel: 7, cookTime: 30, sellPrice: 12000,
        desc: 'Món ăn vương giả. Tăng +40% ATK cho toàn đội Pet trong Thám Hiểm.',
        ingredients: { dragoncry: 1, starbush: 2, tomato: 2 },
        buff: { type: 'hero_atk', val: 0.4, durationMs: 3 * 60 * 60 * 1000, desc: 'Pet +40% ATK (3 giờ)' }
    },
    mutant_ramen: {
        name: 'Ramen Linh Khí Tiên Thiên', category: 'mutant', reqLevel: 7, cookTime: 25, sellPrice: 6000,
        desc: 'Bát ramen bốc linh khí. Lấy vào Takeout sẽ làm nhân vật AI cực kỳ hưng phấn.',
        ingredients: { wujing: 2, chuncai: 1, douya: 2 },
        buff: { type: 'rp_story_boost', val: 1, durationMs: 4 * 60 * 60 * 1000, desc: 'Món quà linh khí tuyệt hảo cho RP' }
    },
    failed_dish: {
        name: 'Thức Ăn Dị Dạng', category: 'failed', reqLevel: 1, cookTime: 3, sellPrice: 5,
        desc: 'Hỗn hợp bốc khói đen do nấu sai công thức. Chỉ có thể đem phi tang...',
        ingredients: {},
        buff: { type: 'none', val: 0, durationMs: 0, desc: 'Không có hiệu ứng đặc biệt, ăn vào đau bụng!' }
    }
};

let _cookingPatched = false;

function patchGameCore() {
    if (_cookingPatched) return;
    _cookingPatched = true;

    let charCode = 200;
    const charMap = {};
    for (const [key, hexColor] of Object.entries(COOKING_P)) {
        if (key === '.' || !hexColor) continue;
        const newChar = String.fromCharCode(charCode++);
        charMap[key] = newChar;
        All.GACHA_P[newChar] = hexColor;
    }

    for (const [dishId, matrix] of Object.entries(COOKING_SPRITES)) {
        const mappedMatrix = matrix.map(row => {
            let newRow = '';
            for (let x = 0; x < row.length; x++) {
                const ch = row[x];
                newRow += ch === '.' ? '.' : (charMap[ch] || '.');
            }
            return newRow;
        });

        const spriteKey = dishId === 'kitchenIcon' ? 'kitchenIcon' : `food_${dishId}`;
        All.registerDynamicSprite(spriteKey, mappedMatrix);
    }

    for (const [id, recipe] of Object.entries(COOKING_RECIPES)) {
        const foodKey = `food_${id}`;
        if (!CROPS[foodKey]) {
            CROPS[foodKey] = {
                name: recipe.name,
                desc: recipe.desc,
                sell: recipe.sellPrice,
                sp: foodKey
            };
        }
    }
}

export function initCookingState() {
    if (!ctx.S.cooking) {
        ctx.S.cooking = { chefLevel: 1, chefExp: 0, unlockedRecipes: ['salad_cherry', 'spring_rolls'], activeBuffs: [] };
    }
    if (!ctx.S.cooking.unlockedRecipes) ctx.S.cooking.unlockedRecipes = ['salad_cherry'];
    if (!ctx.S.cooking.activeBuffs) ctx.S.cooking.activeBuffs = [];
}

export function getActiveCookingBuffs() {
    initCookingState();
    const nowMs = now();
    ctx.S.cooking.activeBuffs = ctx.S.cooking.activeBuffs.filter(b => b.expiresAt > nowMs);
    return ctx.S.cooking.activeBuffs;
}

export function canCookRecipe(recipeId) {
    const recipe = COOKING_RECIPES[recipeId];
    if (!recipe) return false;
    for (const [ingId, reqAmount] of Object.entries(recipe.ingredients)) {
        const bagAmount = ctx.S.bag[ingId] || 0;
        if (bagAmount < reqAmount) return false;
    }
    return true;
}

export function cookRecipe(recipeId) {
    initCookingState();
    const recipe = COOKING_RECIPES[recipeId];
    if (!recipe) return toast('Công thức không tồn tại!');

    if (ctx.S.cooking.chefLevel < recipe.reqLevel) {
        return toast(`Cần cấp Đầu Bếp Lv.${recipe.reqLevel} để nấu món này!`);
    }
    if (!canCookRecipe(recipeId)) return toast('Thiếu nguyên liệu trong Balo!');

    for (const [ingId, reqAmount] of Object.entries(recipe.ingredients)) {
        ctx.S.bag[ingId] -= reqAmount;
        if (ctx.S.bag[ingId] <= 0) delete ctx.S.bag[ingId];
    }

    const foodKey = `food_${recipeId}`;
    ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;

    const expGain = recipe.cookTime * 10;
    ctx.S.cooking.chefExp += expGain;
    const reqExp = ctx.S.cooking.chefLevel * 100;
    if (ctx.S.cooking.chefExp >= reqExp && ctx.S.cooking.chefLevel < 10) {
        ctx.S.cooking.chefLevel++;
        ctx.S.cooking.chefExp -= reqExp;
        toast(`🎉 CHÚC MỪNG! Thăng cấp Đầu Bếp lên Lv.${ctx.S.cooking.chefLevel}!`);
    } else {
        toast(`🍳 Đã nấu thành công ${recipe.name}! (+${expGain} EXP)`);
    }
    save(); renderStatus(); openKitchenModal();
}

export function cookFreeFusion(ingredientList) {
    initCookingState();
    if (!ingredientList || ingredientList.length === 0) return toast('Hãy chọn ít nhất 1 nguyên liệu!');

    const countMap = {};
    for (const ingId of ingredientList) {
        countMap[ingId] = (countMap[ingId] || 0) + 1;
        if ((ctx.S.bag[ingId] || 0) < countMap[ingId]) return toast('Không đủ nguyên liệu trong Balo!');
    }

    for (const [ingId, amt] of Object.entries(countMap)) {
        ctx.S.bag[ingId] -= amt;
        if (ctx.S.bag[ingId] <= 0) delete ctx.S.bag[ingId];
    }

    let matchedRecipeId = null;
    for (const [rId, recipe] of Object.entries(COOKING_RECIPES)) {
        if (rId === 'failed_dish') continue;
        const ingKeys = Object.keys(recipe.ingredients);
        if (ingKeys.length === Object.keys(countMap).length) {
            const match = ingKeys.every(k => recipe.ingredients[k] === countMap[k]);
            if (match) { matchedRecipeId = rId; break; }
        }
    }

    if (matchedRecipeId) {
        const recipe = COOKING_RECIPES[matchedRecipeId];
        const foodKey = `food_${matchedRecipeId}`;
        ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;

        if (!ctx.S.cooking.unlockedRecipes.includes(matchedRecipeId)) {
            ctx.S.cooking.unlockedRecipes.push(matchedRecipeId);
            toast(`🌟 KỲ TÍCH! Khám phá được công thức mới: ${recipe.name}!`);
        } else {
            toast(`✨ Sáng tạo thành công: ${recipe.name}!`);
        }
        ctx.S.cooking.chefExp += recipe.cookTime * 15;
    } else {
        const foodKey = `food_failed_dish`;
        ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;
        toast(`💩 Nấu hỏng rồi! Thức Ăn Dị Dạng đã ra lò...`);
        ctx.S.cooking.chefExp += 5;
    }
    save(); renderStatus(); openKitchenModal();
}

export function eatDish(foodKey) {
    initCookingState();
    const dishId = foodKey.replace('food_', '');
    const recipe = COOKING_RECIPES[dishId];
    if (!recipe) return toast('Món ăn không hợp lệ!');
    if ((ctx.S.bag[foodKey] || 0) <= 0) return toast('Bạn không có món ăn này!');

    ctx.S.bag[foodKey]--;
    if (ctx.S.bag[foodKey] <= 0) delete ctx.S.bag[foodKey];

    const buff = recipe.buff;
    if (buff.type === 'pet_heal') {
        if (All.runState && All.runState.pets) {
            All.runState.pets.forEach(p => { if (p.hp > 0) p.hp = Math.min(p.maxHp, p.hp + p.maxHp * buff.val); });
            toast(`💚 Đã hồi ${buff.val * 100}% HP cho toàn đội Pet!`);
        } else {
            toast(`💚 Món ăn quá bổ dưỡng! Thể lực căng tràn.`);
        }
    } else if (buff.type !== 'none') {
        const expiresAt = now() + buff.durationMs;
        ctx.S.cooking.activeBuffs.push({
            dishId, name: recipe.name, type: buff.type, val: buff.val, zone: buff.zone,
            atkVal: buff.atkVal, hpVal: buff.hpVal, desc: buff.desc, expiresAt
        });
        toast(`😋 Nhóp nhép! Kích hoạt Buff: ${buff.desc}`);
    } else {
        toast(`🤢 Ọe... Mùi vị thật ám ảnh! Bạn bị trừ nhẹ HP tinh thần.`);
    }
    save(); renderStatus(); openKitchenModal();
}

let activeKitchenTab = 'recipes';

function injectKitchenCSS() {
    const rootObj = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
    if (!rootObj || rootObj.querySelector('#kitchen-styles')) return;
    const style = document.createElement('style');
    style.id = 'kitchen-styles';
    style.textContent = `
    .k-header { display:flex; justify-content:space-between; align-items:center; background:#f4e6cf; border:2px solid #ddc39a; padding:10px 14px; border-radius:8px; margin-bottom:12px; }
    .k-chef { font-weight:bold; font-size:14px; color:#c86a1a; display:flex; align-items:center; gap:6px; }
    .k-exp { font-size:11px; color:#a3763d; font-weight:bold; }
    .k-grid { display:grid; grid-template-columns:1fr; gap:8px; max-height: 400px; overflow-y: auto; padding-right: 4px; }
    .k-pot { background:#fffdf4; border:2px inset #c9a273; border-radius:8px; padding:12px; margin-bottom:12px; min-height:60px; }
    .k-ing-tag { color:#2e7d32; font-weight:bold; margin-right:8px; font-size:11px; display:inline-block; margin-top:2px; }
    .k-ing-tag.miss { color:#d32f2f; }
  `;
    rootObj.appendChild(style);
}

export function openKitchenModal() {
    patchGameCore();
    initCookingState();
    injectKitchenCSS();

    const cooking = ctx.S.cooking;
    const activeBuffs = getActiveCookingBuffs();

    const headerHtml = `
    <div class="k-header">
      <div class="k-chef">${All.spriteSVG('kitchenIcon', 24)} Đầu Bếp: Lv.${cooking.chefLevel}</div>
      <div class="k-exp">EXP: ${cooking.chefExp} / ${cooking.chefLevel * 100}</div>
    </div>
    <div class="tabs" style="justify-content:center;">
      <span class="tab ${activeKitchenTab === 'recipes' ? 'active' : ''}" id="tab-cook-recipes">Sách Món</span>
      <span class="tab ${activeKitchenTab === 'fusion' ? 'active' : ''}" id="tab-cook-fusion">Sáng Tạo</span>
      <span class="tab ${activeKitchenTab === 'fridge' ? 'active' : ''}" id="tab-cook-fridge">Tủ Lạnh</span>
      <span class="tab ${activeKitchenTab === 'buffs' ? 'active' : ''}" id="tab-cook-buffs">Buff (${activeBuffs.length})</span>
    </div>
  `;

    let bodyHtml = '';

    if (activeKitchenTab === 'recipes') {
        let recipeRows = '';
        for (const [rId, recipe] of Object.entries(COOKING_RECIPES)) {
            if (rId === 'failed_dish') continue;
            const isUnlocked = cooking.unlockedRecipes.includes(rId);
            const isLevelMet = cooking.chefLevel >= recipe.reqLevel;
            const hasIngredients = canCookRecipe(rId);

            let ingHtml = '';
            for (const [ingId, reqAmt] of Object.entries(recipe.ingredients)) {
                const cropDef = CROPS[ingId] || { name: ingId };
                const haveAmt = ctx.S.bag[ingId] || 0;
                ingHtml += `<span class="k-ing-tag ${haveAmt >= reqAmt ? '' : 'miss'}">${cropDef.name}: ${haveAmt}/${reqAmt}</span>`;
            }

            const icon = isUnlocked ? All.spriteSVG(`food_${rId}`, 36) : `<div style="font-size:24px; color:#aaa; text-align:center;">?</div>`;
            const nameStr = isUnlocked ? recipe.name : `Hương Vị Bí Ẩn (Cần Lv.${recipe.reqLevel})`;
            const descStr = isUnlocked ? recipe.desc : `Nấu nướng ngẫu nhiên để khám phá công thức này!`;

            recipeRows += `
        <div class="item" style="opacity: ${isLevelMet ? 1 : 0.6};">
          <div class="icon" style="background:#fffdf4;">${icon}</div>
          <div class="info">
            <div class="name">${nameStr}</div>
            <div class="meta">${descStr}</div>
            ${isUnlocked ? `<div>${ingHtml}</div>` : ''}
          </div>
          <div class="acts">
            ${isUnlocked ? `<span class="buy ${hasIngredients ? '' : 'off'}" data-cook="${rId}">Nấu</span>` : `<span class="buy off">Khóa</span>`}
          </div>
        </div>
      `;
        }
        bodyHtml = `<div class="k-grid">${recipeRows}</div>`;

    } else if (activeKitchenTab === 'fusion') {
        let bagCrops = '';
        for (const [bKey, amt] of Object.entries(ctx.S.bag)) {
            if (amt > 0 && CROPS[bKey] && !bKey.startsWith('food_')) {
                bagCrops += `<span class="pick" data-add-ing="${bKey}">${CROPS[bKey].name} (x${amt})</span>`;
            }
        }

        bodyHtml = `
      <div class="note" style="margin-bottom:10px;">Thả tối đa 4 loại củ quả vào nồi. Có thể phát minh ra món mới đó!</div>
      <div class="k-pot">
        <div style="font-size:12px; font-weight:bold; color:#7a5c38; margin-bottom:6px;">Đang ở trong nồi:</div>
        <div id="fusion-pot" style="display:flex; gap:8px; flex-wrap:wrap;">
          <span style="color:#aaa; font-size:11px; font-style:italic;">(Trống)</span>
        </div>
      </div>
      <div style="font-size:12px; font-weight:bold; color:#7a5c38; margin-bottom:6px;">Kho nguyên liệu:</div>
      <div class="picker" style="max-height:120px; overflow-y:auto;">
        ${bagCrops || '<div style="color:#aaa; font-size:12px;">Đã hết rau củ rồi! Về vườn thu hoạch thôi.</div>'}
      </div>
      <div style="margin-top:14px; text-align:center;">
        <span class="buy" id="btn-start-fusion" style="padding:8px 24px; font-size:13px;">🔥 Bật Lửa Nấu!</span>
      </div>
    `;

    } else if (activeKitchenTab === 'fridge') {
        let fridgeRows = '';
        const foodKeys = Object.keys(ctx.S.bag).filter(k => k.startsWith('food_'));

        if (foodKeys.length === 0) {
            fridgeRows = `<div class="note">Tủ lạnh đang trống. Hãy sang Sách Công Thức để nấu ăn ngay thôi!</div>`;
        } else {
            fridgeRows = foodKeys.map(k => {
                const dishId = k.replace('food_', '');
                const recipe = COOKING_RECIPES[dishId] || COOKING_RECIPES.failed_dish;
                const amt = ctx.S.bag[k];
                return `
          <div class="item">
            <div class="icon" style="background:#fffdf4;">${All.spriteSVG(k, 36)}</div>
            <div class="info">
              <div class="name">${recipe.name} (x${amt})</div>
              <div class="meta">${recipe.desc}</div>
            </div>
            <div class="acts">
              <span class="buy" data-eat="${k}" style="background:#4caf50; border-color:#2e7d32; color:#fff;">Ăn ngay</span>
            </div>
          </div>
        `;
            }).join('');
        }
        bodyHtml = `<div class="k-grid">${fridgeRows}</div>`;

    } else if (activeKitchenTab === 'buffs') {
        let buffRows = '';
        if (activeBuffs.length === 0) {
            buffRows = `<div class="note">Bụng đang trống rỗng, không có Buff ẩm thực nào đang hoạt động.</div>`;
        } else {
            const nowMs = now();
            for (const buff of activeBuffs) {
                const remSec = Math.max(0, Math.floor((buff.expiresAt - nowMs) / 1000));
                const minStr = Math.floor(remSec / 60);
                const secStr = remSec % 60;
                buffRows += `
          <div class="item">
            <div class="icon" style="background:#fffdf4;">${All.spriteSVG(`food_${buff.dishId}`, 32)}</div>
            <div class="info">
              <div class="name" style="color:#d32f2f;">${buff.name}</div>
              <div class="meta">${buff.desc}</div>
            </div>
            <div style="font-weight:bold; font-size:12px; color:#c86a1a;">
              ⏱️ ${minStr}m ${secStr}s
            </div>
          </div>
        `;
            }
        }
        bodyHtml = `<div class="k-grid">${buffRows}</div>`;
    }

    openModal('Nhà Bếp Nông Trại 🍳', headerHtml + bodyHtml);

    // Gắn Sự kiện Tabs
    All.$id('tab-cook-recipes')?.addEventListener('click', () => { activeKitchenTab = 'recipes'; openKitchenModal(); });
    All.$id('tab-cook-fusion')?.addEventListener('click', () => { activeKitchenTab = 'fusion'; openKitchenModal(); });
    All.$id('tab-cook-fridge')?.addEventListener('click', () => { activeKitchenTab = 'fridge'; openKitchenModal(); });
    All.$id('tab-cook-buffs')?.addEventListener('click', () => { activeKitchenTab = 'buffs'; openKitchenModal(); });

    // Gắn Sự Kiện Nút Nấu & Ăn
    All.$id('mbody')?.querySelectorAll('[data-cook]').forEach(btn => {
        btn.addEventListener('click', (e) => cookRecipe(e.currentTarget.dataset.cook));
    });
    All.$id('mbody')?.querySelectorAll('[data-eat]').forEach(btn => {
        btn.addEventListener('click', (e) => eatDish(e.currentTarget.dataset.eat));
    });

    // Gắn Xử lý Fusion
    const fusionSelected = [];
    const potEl = All.$id('fusion-pot');
    All.$id('mbody')?.querySelectorAll('[data-add-ing]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ingId = e.currentTarget.dataset.addIng;
            if (fusionSelected.length >= 4) return toast('Nồi đầy rồi (tối đa 4 củ)!');
            fusionSelected.push(ingId);
            potEl.innerHTML = fusionSelected.map((id, idx) => `<span class="pick active" data-remove-fusion="${idx}">${CROPS[id]?.name || id} ✕</span>`).join('');
            potEl.querySelectorAll('[data-remove-fusion]').forEach(remBtn => {
                remBtn.addEventListener('click', (re) => {
                    fusionSelected.splice(parseInt(re.currentTarget.dataset.removeFusion), 1);
                    re.currentTarget.remove();
                });
            });
        });
    });
    All.$id('btn-start-fusion')?.addEventListener('click', () => cookFreeFusion(fusionSelected));
}

export function injectCookingButton() {
    patchGameCore();
    const shadowRoot = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
    if (!shadowRoot) return;


    const bottombar = shadowRoot.querySelector('.bottombar');
    if (bottombar && !shadowRoot.querySelector('[data-open="cooking"]')) {
        const btn = document.createElement('div');
        btn.className = 'btn';
        btn.dataset.open = 'cooking';
        btn.innerHTML = `${All.spriteSVG('kitchenIcon', 22)}Nấu ăn`;
        btn.addEventListener('click', () => openKitchenModal());
        const cfgBtn = bottombar.querySelector('[data-open="cfg"]');
        cfgBtn ? bottombar.insertBefore(btn, cfgBtn) : bottombar.appendChild(btn);
    }

}

if (typeof window !== 'undefined') {
    patchGameCore();
    const tryInject = () => { initCookingState(); injectCookingButton(); };
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', tryInject); }
    else { setTimeout(tryInject, 500); setTimeout(tryInject, 1500); }

    const observer = new MutationObserver(() => injectCookingButton());
    setTimeout(() => {
        const root = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
        if (root) observer.observe(root, { childList: true, subtree: true });
    }, 1000);
}
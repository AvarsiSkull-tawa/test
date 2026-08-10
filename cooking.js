import { ctx } from './store.js';
import * as All from './all.js';
import { CROPS } from './data.js';
import { now, save } from './state.js';
import { toast } from './witch.js';
import { renderStatus } from './render.js';
import { openModal } from './shop.js';

// ============================================================================
// 1. BẢNG MÀU ẨM THỰC CHUYÊN DỤNG (CULINARY PIXEL PALETTE)
// ============================================================================
export const COOKING_P = {
    '.': null,
    'K': '#231815', 'k': '#3a2923',
    'W': '#ffffff', 'w': '#f5f0eb',
    'S': '#dcd0c0', 's': '#b8a898',
    'R': '#e83e35', 'r': '#b8231c',
    'G': '#50b83c', 'g': '#328024',
    'E': '#8ce060', 'e': '#c8f598',
    'Y': '#f8cf28', 'y': '#d09f18',
    'O': '#f08028', 'o': '#b85018',
    'B': '#805038', 'b': '#503020',
    'P': '#d880b0', 'p': '#a04880',
    'V': '#9050c0', 'v': '#602888',
    'C': '#70d0e0', 'c': '#3090a0',
    'F': '#e0f0f5', 'f': '#a0c0d0',
    'M': '#605850', 'm': '#403830',
    'A': '#ffd94d', 'a': '#ffb300',
};

// ============================================================================
// 2. MA TRẬN SPRITE PIXEL DÀNH RIÊNG CHO MÓN ĂN & NÚT BẤM
// ============================================================================
export const COOKING_SPRITES = {
    kitchenIcon: [
        "................", "......ww........", ".....w..w.......", "......ww........",
        "....kkMMkk......", "...kMMMMMMk.....", "..kMMMMMMMMk....", "..kMooooooMk....",
        "..kMoOOOOoMk....", "..kMoOOOOoMk....", "..kMooooooMk....", "..kMMMMMMMMk....",
        "...kMMMMMMk.....", "....kkKKkk......", ".....k..k.......", "................"
    ],
    salad_cherry: [
        "................", ".....SSSSSS.....", "...SSwwwwwwSS...", "..SwwwwwwwwwwS..",
        ".SwwGgEEgGGwwS..", ".SwGEGgRrGgEwS..", ".SwgRrGEGrRgSw..", ".SwGgEGrRgEGwS..",
        ".SwgGEGrRgEgSw..", ".SwwgGEEgGGwwS..", "..SwwwwwwwwwwS..", "...SSwwwwwwSS...",
        ".....SSSSSS.....", "................", "................", "................"
    ],
    soup_tomato: [
        "................", "......wwww......", ".....w....w.....", "....mmmmmmmm....",
        "...mRRRRRRRRm...", "..mRRyYRRRyYRm..", "..mRyYYRRyYYRm..", "..mRRRRRRRRRRm..",
        "..mRRgGRRRgGRm..", "..mRRRRRRRRRRm..", "...mRRRRRRRRm...", "....mmmmmmmm....",
        ".....KKKKKK.....", "................", "................", "................"
    ],
    spring_rolls: [
        "................", "......wwww......", "....ww....ww....", "..wwwSSSSSSwww..",
        ".wwSSWWWWWWSSww.", ".wSWWyYYyYYWWSw.", ".wSWyyyyyyyyWSw.", ".wSWyYYoYYoYWSw.",
        ".wSWyyyyyyyyWSw.", ".wSWWWWWWWWWWSw.", ".wwSSSSSSSSSSww.", "..www......www..",
        "....ww....ww....", "......wwww......", "................", "................"
    ],
    radish_soup: [
        "................", ".......w........", "......w.w.......", ".....w...w......",
        "...ffffffffff...", "..fWWWWWWWWWWf..", ".fWWgGWWgGWWWWf.", ".fWWrRWWPPWWWWf.",
        ".fWWRrWWppWWgGf.", ".fWWWWWWWWWWWWf.", ".fWWgGWWgGWWWWf.", "..fWWWWWWWWWWf..",
        "...ffffffffff...", "....fFFFFFFf....", ".....ffffff.....", "................"
    ],
    candied_strawberry: [
        "................", ".......ww.......", "......wRRw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", "......wbbw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", "......wbbw......", ".....wRRRRw.....",
        ".....wRRRRw.....", "......wRRw......", ".......bb.......", ".......bb......."
    ],
    sweet_soup: [
        "................", "......ffff......", ".....fCCCCf.....", "....fCCWWCCf....",
        "...fCWYyYWCf...", "..fCYyYyyYyYCf..", "..fCYyWkKyYCf..", "..fCYyYyyYyYCf..",
        "..fCCYYYYCCf..", "...fCCCCCCCCf...", "....fCCCCCCf....", ".....ffffff.....",
        "......SSSS......", "................", "................", "................"
    ],
    stir_fry_jiaobai: [
        ".......w........", "......w.w.......", "....mmmmmmmm....", "...mKKKKKKKKm...",
        "..mKeeoOooeeKm..", ".mKeEEoOOoEEeKm.", ".mKeeoOOOOoeeKm.", ".mKEEEEooEEEEKm.",
        ".mKeeoOooOOeeKm.", "..mKKKKKKKKKKm..", "...mmmmmmmmmm...", "....mMMMMMMm....",
        "................", "................", "................", "................"
    ],
    hotpot_lotus: [
        ".......w........", ".....ww.ww......", "....mmmmmmmm....", "...mBBBBBBBBm...",
        "..mBwWwBBsSsBm..", ".mBWwGwBsSwsSBm.", ".mBBwWwBBsSsBm..", ".mBRRBBBBBBBRRm.",
        ".mBRrRBBgGBRrRm.", ".mBRRBBBgGBBRRm.", "..mBBBBBBBBBBm..", "...mmmmmmmmmm...",
        "....kKKKKKKk....", ".....k....k.....", "................", "................"
    ],
    glow_soup: [
        ".......A........", "......A.A.......", ".....A...A......", "....KKKKKKKK....",
        "...KCCCCCCCCK...", "..KCcCcAaCcCcK..", ".KCcCAAAAcCCcK.", ".KCcAaCCaACcCcK.",
        ".KCcCcAAcCcCcK.", "..KCCCCCCCCCCK..", "...KKKKKKKKKK...", "....KKKKKKKK....",
        ".....KkkkkK.....", "................", "................", "................"
    ],
    candy_flower: [
        "................", "......WWWW......", "....WWPppPWW....", "...WPpPPPpPW....",
        "..WPpPWWWPpPW...", ".WPpPWaaAWPpPW.", ".WPpPWaAaWPpPW.", ".WPpPWaaAWPpPW.",
        "..WPpPWWWPpPW...", "...WPpPPPpPW....", "....WWPppPWW....", "......WWWW......",
        ".......bb.......", ".......bb.......", ".......bb.......", "................"
    ],
    opal_tea: [
        ".......w........", "......w.w.......", ".......w........", ".....FFFFFF.....",
        "....FffffffF....", "...FfCCCCCCfF...", "..FfCCccCCccfF..", "..FfCCcCcCccfF..",
        "..FfCCcCcCccfF..", "..FfCCccCCccfF..", "..FfCCCCCCccfF..", "...FfCCCCCCfF...",
        "....FffffffF....", ".....FFFFFF.....", "................", "................"
    ],
    pie_pumpkin: [
        "................", "......OOOO......", "....OOoYYoOO....", "...OoYYYYYYoO...",
        "..OoYYvVVvYYoO..", ".OoYvVVWWVvYoO.", ".OoYvVWWWvVYoO.", ".OoYvVVWWVvYoO.",
        ".OoYYvVVvYYYoO.", "..OoYYYYYYYoO..", "...OoYYYYYoO...", "....OOoYYoOO....",
        "......OOOO......", "................", "................", "................"
    ],
    dragon_ribs: [
        ".......V........", "......V.V.......", "....vVVVVv......", "...vWWRRWWv.....",
        "..vWWRrrRWWv....", ".sSwRRrrRRwSs...", "sSWoRRrrRRoWSs..", "sSsoRRrrRRosSs..",
        ".sSwRRrrRRwSs...", "..vWWRrrRWWv....", "...vWWRRWWv.....", "....vVVVVv......",
        "......V.V.......", ".......V........", "................", "................"
    ],
    mutant_ramen: [
        ".......w........", "......w.w.......", ".......w........", "....FFFFFFFF....",
        "...fVVYyYyVVf...", "..fVYyWwWwYyVf..", ".fVYywwPpwwYyVf.", ".fVYywwPPwwYyVf.",
        ".fVYyWwWwWwYyVf.", ".fVVYyYyYyYyVVf.", "..fVVVVVVVVVVf..", "...ffffffffff...",
        "....FFFFFFFF....", ".....kkkkkk.....", "......k..k......", "................"
    ]
};

// ============================================================================
// 3. RECIPES & DISH DATABASE (Tất cả được MỞ KHÓA TỪ ĐẦU)
// ============================================================================
export const COOKING_RECIPES = {
    salad_cherry: {
        name: 'Salad Cherry Tươi', sellPrice: 150,
        desc: 'Giòn ngọt thanh mát. Giảm 20% thời gian mọc cây khi gieo hạt ở Đồng Cỏ (Tác dụng 1 giờ).',
        ingredients: { radish: 2, douya: 2 },
        buff: { type: 'crop_speed', zone: 1, val: 0.8, durationMs: 60 * 60 * 1000, desc: 'Giảm 20% thời gian mọc cây ở Đồng cỏ' }
    },
    spring_rolls: {
        name: 'Chả Giò Giá Đỗ', sellPrice: 130,
        desc: 'Vỏ giòn rụm, nhân thơm lừng. Hồi lập tức 20% Máu cho toàn đội Pet.',
        ingredients: { douya: 4 },
        buff: { type: 'pet_heal', val: 0.2, durationMs: 0, desc: 'Hồi ngay 20% Max HP cho Pet' }
    },
    radish_soup: {
        name: 'Canh Củ Cải Rong Tảo', sellPrice: 200,
        desc: 'Thanh lọc cơ thể. Tăng 10% Tốc đánh (SPD) cho Pet trong 30 phút.',
        ingredients: { radish: 2, chuncai: 2 },
        buff: { type: 'hero_speed', val: 0.1, durationMs: 30 * 60 * 1000, desc: 'Pet +10% Tốc đánh' }
    },
    soup_tomato: {
        name: 'Súp Cà Chua Bồng Bềnh', sellPrice: 220,
        desc: 'Bát súp chua ngọt bốc khói. Hồi lập tức 50% Máu cho toàn đội Pet.',
        ingredients: { tomato: 3, douya: 1 },
        buff: { type: 'pet_heal', val: 0.5, durationMs: 0, desc: 'Hồi ngay 50% Max HP cho Pet' }
    },
    candied_strawberry: {
        name: 'Kẹo Hồ Lô Dâu Tây', sellPrice: 850,
        desc: 'Ngọt lịm tim. Tăng 15% Tỉ lệ Chí Mạng (Crit Rate) cho Pet trong 30 phút.',
        ingredients: { strawberry: 1, douya: 1 },
        buff: { type: 'hero_crit', val: 0.15, durationMs: 30 * 60 * 1000, desc: 'Pet +15% Tỉ lệ Crit' }
    },
    sweet_soup: {
        name: 'Chè Củ Năng Củ Ấu', sellPrice: 800,
        desc: 'Giải nhiệt xua tan mệt mỏi. Giảm 25% thời gian mọc cây ở Vùng Nước.',
        ingredients: { biqi: 2, lingjiao: 1 },
        buff: { type: 'crop_speed', zone: 2, val: 0.75, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +25% (Vùng nước)' }
    },
    stir_fry_jiaobai: {
        name: 'Củ Niễng Xào Dòn', sellPrice: 1300,
        desc: 'Cực kỳ tốn cơm. Buff x1.5 Máu tối đa (Max HP) cho Pet trong 1 giờ.',
        ingredients: { jiaobai: 2, chuncai: 1 },
        buff: { type: 'hero_hp', val: 0.5, durationMs: 60 * 60 * 1000, desc: 'Pet +50% Max HP' }
    },
    hotpot_lotus: {
        name: 'Lẩu Củ Sen Đầm Lầy', sellPrice: 3500,
        desc: 'Nồi lẩu đậm đà thơm nức. Thưởng thêm 30% lợi nhuận khi Bán bất kỳ món gì trong túi!',
        ingredients: { lianou: 1, biqi: 2, lingjiao: 2 },
        buff: { type: 'sell_price_boost', val: 1.30, durationMs: 2 * 60 * 60 * 1000, desc: 'Nhận thêm 30% Vàng khi Bán đồ' }
    },
    glow_soup: {
        name: 'Súp Tinh Thạch', sellPrice: 1600,
        desc: 'Phát sáng lấp lánh trong đêm. Giảm 30% thời gian mọc cây ở Khu Mỏ.',
        ingredients: { wujing: 2, starbush: 1 },
        buff: { type: 'crop_speed', zone: 3, val: 0.7, durationMs: 60 * 60 * 1000, desc: 'Rau mọc nhanh +30% (Khu mỏ)' }
    },
    candy_flower: {
        name: 'Hoa Kẹo Mút Bảo Thạch', sellPrice: 4000,
        desc: 'Đẹp đến mức không nỡ ăn. Cộng thêm 20% Né Tránh cho tất cả Pet ở Hầm ngục.',
        ingredients: { gemflower: 1, moonberry: 1 },
        buff: { type: 'hero_dodge', val: 0.2, durationMs: 2 * 60 * 60 * 1000, desc: 'Pet +20% Tỉ lệ Né Tránh' }
    },
    opal_tea: {
        name: 'Trà Dây Leo Opal', sellPrice: 2500,
        desc: 'Nước trà xanh ngọc bích, uống vào nhẹ bẫng. Tăng X2 Tốc độ di chuyển cho Pet.',
        ingredients: { opalvine: 1, wujing: 1 },
        buff: { type: 'hero_speed', val: 1.0, durationMs: 60 * 60 * 1000, desc: 'Pet X2 Tốc đánh (SPD)' }
    },
    pie_pumpkin: {
        name: 'Bánh Bí Ngô Ánh Trăng', sellPrice: 3000,
        desc: 'Thơm lừng mùi bơ sữa. Buff máu (HP) và Sát thương (ATK) của Pet lên 20%!',
        ingredients: { pumpkin: 2, moonberry: 2 },
        buff: { type: 'hero_stats_boost', atkVal: 1.2, hpVal: 1.2, durationMs: 2 * 60 * 60 * 1000, desc: 'Pet +20% ATK & +20% HP' }
    },
    dragon_ribs: {
        name: 'Sườn Rồng Sốt Long Tinh', sellPrice: 12000,
        desc: 'Món ăn vương giả tràn đầy sức mạnh. Tăng +100% ATK cho toàn đội Pet trong Thám Hiểm!',
        ingredients: { dragoncry: 1, starbush: 2, tomato: 2 },
        buff: { type: 'hero_atk', val: 1.0, durationMs: 3 * 60 * 60 * 1000, desc: 'Pet X2 Sức mạnh Bạo Tàn (ATK)' }
    },
    mutant_ramen: {
        name: 'Ramen Linh Khí Tiên Thiên', sellPrice: 6000,
        desc: 'Bát ramen bốc linh khí. Lấy vào Takeout, bạn và bạn Chat sẽ cảm thấy hưng phấn tột độ.',
        ingredients: { wujing: 2, chuncai: 1, douya: 2 },
        buff: { type: 'rp_story_boost', val: 1, durationMs: 4 * 60 * 60 * 1000, desc: 'Buff tâm trạng tích cực cho Roleplay' }
    }
};

// ============================================================================
// 4. DAEMON WORKER & EVENT INTERCEPTOR (AN TOÀN HƠN)
// ============================================================================
let _cookingPatched = false;
let _sellEventAttached = false;

function patchGameMechanics() {
    if (_cookingPatched) return;
    _cookingPatched = true;

    // 1. Ánh xạ Bảng Màu Bí Mật vào All.GACHA_P
    let charCode = 200;
    const charMap = {};
    for (const [key, hexColor] of Object.entries(COOKING_P)) {
        if (key === '.' || !hexColor) continue;
        const newChar = String.fromCharCode(charCode++);
        charMap[key] = newChar;
        All.GACHA_P[newChar] = hexColor;
    }

    // 2. Đăng ký Sprite Động
    for (const [dishId, matrix] of Object.entries(COOKING_SPRITES)) {
        const mappedMatrix = matrix.map(row => {
            let newRow = '';
            for (let x = 0; x < row.length; x++) { newRow += row[x] === '.' ? '.' : (charMap[row[x]] || '.'); }
            return newRow;
        });
        const spriteKey = dishId === 'kitchenIcon' ? 'kitchenIcon' : `food_${dishId}`;
        All.registerDynamicSprite(spriteKey, mappedMatrix);
    }

    // 3. Tiêm danh mục Món ăn vào CSDL Nông Sản
    for (const [id, recipe] of Object.entries(COOKING_RECIPES)) {
        const foodKey = `food_${id}`;
        if (!CROPS[foodKey]) {
            CROPS[foodKey] = { name: recipe.name, desc: recipe.desc, sell: recipe.sellPrice, sp: foodKey };
        }
    }

    // 4. DAEMON: Vòng lặp Áp dụng Buff cho Cây trồng & Hầm ngục
    setInterval(() => {
        const buffs = getActiveCookingBuffs();
        if (buffs.length === 0) return;

        // A. Xử lý Mọc cây nhanh 
        const speedBuffs = buffs.filter(b => b.type === 'crop_speed');
        if (speedBuffs.length > 0 && ctx.S && ctx.S.plots) {
            [1, 2, 3].forEach(pg => {
                const plots = pg === 2 ? ctx.S.plots2 : pg === 3 ? ctx.S.plots3 : ctx.S.plots;
                if (!plots) return;
                const validBuff = speedBuffs.find(b => b.zone === pg || b.zone === 0);
                if (!validBuff) return;

                plots.forEach(p => {
                    const c = p.crop;
                    if (c && !c._cookSpeedApplied) {
                        const left = c.matureAt - now();
                        if (left > 0) {
                            c.matureAt = now() + Math.floor(left * validBuff.val);
                            c._cookSpeedApplied = true;
                        }
                    }
                });
            });
        }

        // B. Xử lý Buff Hero Mode
        if (All.runState && All.runState.pets) {
            All.runState.pets.forEach(p => {
                if (!p._cookBuffApplied) {
                    let hpM = 1, atkM = 1, spdM = 1, addCrit = 0, addDodge = 0;
                    buffs.forEach(b => {
                        if (b.type === 'hero_hp') hpM += b.val;
                        if (b.type === 'hero_atk') atkM += b.val;
                        if (b.type === 'hero_speed') spdM += b.val;
                        if (b.type === 'hero_crit') addCrit += b.val;
                        if (b.type === 'hero_dodge') addDodge += b.val;
                        if (b.type === 'hero_stats_boost') { atkM += (b.atkVal - 1); hpM += (b.hpVal - 1); }
                    });

                    if (hpM !== 1) { p.maxHp = Math.floor(p.maxHp * hpM); p.hp = p.maxHp; }
                    if (atkM !== 1) { p.atk = Math.floor(p.atk * atkM); }
                    if (spdM !== 1) { p.maxCd = p.maxCd / spdM; p.cd = p.maxCd; }
                    if (addCrit > 0) { p.crit += addCrit; }
                    if (addDodge > 0) { p.dodge += addDodge; }

                    p._cookBuffApplied = true;

                    const shadowRoot = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
                    const pEl = shadowRoot?.querySelector('#hpet-' + All.runState.pets.indexOf(p));
                    if (pEl) {
                        const fl = document.createElement('div');
                        fl.className = 'dmg-float buff';
                        fl.textContent = 'YUMMY BUFF!';
                        fl.style.color = '#ff88dd';
                        fl.style.left = '-10px';
                        fl.style.bottom = '40px';
                        fl.style.animation = 'dDrop 1.2s forwards';
                        pEl.appendChild(fl);
                        setTimeout(() => fl.remove(), 1000);
                    }
                }
            });
        }
    }, 1000);

    // 5. EVENT INTERCEPTOR: Bắt sự kiện Bán bằng JS chuẩn
    const shadowRoot = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
    if (shadowRoot && !_sellEventAttached) {
        _sellEventAttached = true;
        shadowRoot.addEventListener('click', (e) => {
            const target = /** @type {Element} */ (e.target);
            const sellBtn = target.closest('#sellGo, #sellSelGo, #sellSeedGo');
            if (sellBtn) {
                const sellBuff = getActiveCookingBuffs().find(b => b.type === 'sell_price_boost');
                if (sellBuff) {
                    const coinsBefore = ctx.S.coins;
                    setTimeout(() => {
                        const gain = ctx.S.coins - coinsBefore;
                        if (gain > 0) {
                            const bonus = Math.floor(gain * (sellBuff.val - 1));
                            ctx.S.coins += bonus;
                            All.save();
                            All.renderStatus();
                            toast(`🍲 Gia Vị Bí Truyền: Nhận thêm +${bonus.toLocaleString()} G!`);
                        }
                    }, 50);
                }
            }
        }, true);
    }
}

// ============================================================================
// 5. HÀM QUẢN LÝ NẤU ĂN VÀ TRẠNG THÁI (ĐÃ LƯỢC BỎ LEVEL & FUSION)
// ============================================================================
export function initCookingState() {
    if (!ctx.S.cooking) {
        ctx.S.cooking = { activeBuffs: [] };
    }
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
        if ((ctx.S.bag[ingId] || 0) < reqAmount) return false;
    }
    return true;
}

export function cookRecipe(recipeId) {
    initCookingState();
    const recipe = COOKING_RECIPES[recipeId];
    if (!recipe) return toast('Công thức không tồn tại!');
    if (!canCookRecipe(recipeId)) return toast('Thiếu nguyên liệu trong Balo!');

    for (const [ingId, reqAmount] of Object.entries(recipe.ingredients)) {
        ctx.S.bag[ingId] -= reqAmount;
        if (ctx.S.bag[ingId] <= 0) delete ctx.S.bag[ingId];
    }

    const foodKey = `food_${recipeId}`;
    ctx.S.bag[foodKey] = (ctx.S.bag[foodKey] || 0) + 1;

    toast(`🍳 Đã nấu thành công món ${recipe.name}! Mùi thơm nức mũi!`);
    save(); All.renderStatus(); openKitchenModal();
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
    } else if (buff.type === 'rp_story_boost') {
        if (All.setTakeoutNote && All.updateInjection) {
            let currentNotes = All.takeoutNote || [];
            currentNotes = currentNotes.filter(t => now() < t.until);
            currentNotes.push({
                txt: `User vừa ăn trọn bát ${recipe.name}! Cơ thể User tỏa ra linh khí tiên thiên, tinh thần sảng khoái và cực kỳ hưng phấn. Sự việc này sẽ ảnh hưởng tốt tới dòng câu chuyện tiếp theo!`,
                until: now() + buff.durationMs
            });
            All.setTakeoutNote(currentNotes);
            All.updateInjection();
        }
        toast(`🍜 Thần khí nhập thể! Đối tác Chat AI sẽ nhận ra bạn vừa thăng hoa.`);
    } else if (buff.type !== 'none') {
        const expiresAt = now() + buff.durationMs;
        ctx.S.cooking.activeBuffs.push({
            dishId, name: recipe.name, type: buff.type, val: buff.val, zone: buff.zone,
            atkVal: buff.atkVal, hpVal: buff.hpVal, desc: buff.desc, expiresAt
        });
        toast(`😋 Măm măm! Đã nhận Buff: ${buff.desc}`);
    }
    save(); All.renderStatus(); openKitchenModal();
}

// ============================================================================
// 6. GIAO DIỆN CỬA SỔ NHÀ BẾP (KITCHEN UI MODAL)
// ============================================================================
let activeKitchenTab = 'recipes';

function injectKitchenCSS() {
    const rootObj = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
    if (!rootObj || rootObj.querySelector('#kitchen-styles')) return;
    const style = document.createElement('style');
    style.id = 'kitchen-styles';
    style.textContent = `
    .k-header { display:flex; justify-content:center; align-items:center; background:#f4e6cf; border:2px solid #ddc39a; padding:10px 14px; border-radius:8px; margin-bottom:12px; }
    .k-chef { font-weight:bold; font-size:15px; color:#c86a1a; display:flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:1px; }
    .k-grid { display:grid; grid-template-columns:1fr; gap:8px; max-height: 400px; overflow-y: auto; padding-right: 4px; }
    .k-ing-tag { color:#2e7d32; font-weight:bold; margin-right:8px; font-size:11px; display:inline-block; margin-top:2px; background:#e8f5e9; padding:2px 6px; border-radius:4px; border:1px solid #c8e6c9;}
    .k-ing-tag.miss { color:#d32f2f; background:#ffebee; border-color:#ffcdd2;}
  `;
    rootObj.appendChild(style);
}

export function openKitchenModal() {
    patchGameMechanics();
    initCookingState();
    injectKitchenCSS();

    const activeBuffs = getActiveCookingBuffs();

    const headerHtml = `
    <div class="k-header">
      <div class="k-chef">${All.spriteSVG('kitchenIcon', 24)} Bếp Trưởng: ${ctx.S.username || 'Bạn'}</div>
    </div>
    <div class="tabs" style="justify-content:center;">
      <span class="tab ${activeKitchenTab === 'recipes' ? 'active' : ''}" id="tab-cook-recipes">Sách Món</span>
      <span class="tab ${activeKitchenTab === 'fridge' ? 'active' : ''}" id="tab-cook-fridge">Tủ Lạnh</span>
      <span class="tab ${activeKitchenTab === 'buffs' ? 'active' : ''}" id="tab-cook-buffs">Buff (${activeBuffs.length})</span>
    </div>
  `;

    let bodyHtml = '';

    if (activeKitchenTab === 'recipes') {
        let recipeRows = '';
        for (const [rId, recipe] of Object.entries(COOKING_RECIPES)) {
            const hasIngredients = canCookRecipe(rId);

            let ingHtml = '';
            for (const [ingId, reqAmt] of Object.entries(recipe.ingredients)) {
                const cropDef = CROPS[ingId] || { name: ingId };
                const haveAmt = ctx.S.bag[ingId] || 0;
                ingHtml += `<span class="k-ing-tag ${haveAmt >= reqAmt ? '' : 'miss'}">${cropDef.name}: ${haveAmt}/${reqAmt}</span>`;
            }

            recipeRows += `
        <div class="item">
          <div class="icon" style="background:#fffdf4;">${All.spriteSVG(`food_${rId}`, 36)}</div>
          <div class="info">
            <div class="name">${recipe.name}</div>
            <div class="meta">${recipe.desc}</div>
            <div>${ingHtml}</div>
          </div>
          <div class="acts">
            <span class="buy ${hasIngredients ? '' : 'off'}" ${hasIngredients ? `data-cook="${rId}"` : ''}>Nấu</span>
          </div>
        </div>
      `;
        }
        bodyHtml = `<div class="k-grid">${recipeRows}</div>`;

    } else if (activeKitchenTab === 'fridge') {
        let fridgeRows = '';
        const foodKeys = Object.keys(ctx.S.bag).filter(k => k.startsWith('food_'));

        if (foodKeys.length === 0) {
            fridgeRows = `<div class="note">Tủ lạnh đang trống. Hãy chuyển sang mục Sách Món để nấu ăn ngay thôi!</div>`;
        } else {
            fridgeRows = foodKeys.map(k => {
                const dishId = k.replace('food_', '');
                const recipe = COOKING_RECIPES[dishId];
                if (!recipe) return '';
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
    const getEl = (id) => All.$id(id);
    getEl('tab-cook-recipes')?.addEventListener('click', () => { activeKitchenTab = 'recipes'; openKitchenModal(); });
    getEl('tab-cook-fridge')?.addEventListener('click', () => { activeKitchenTab = 'fridge'; openKitchenModal(); });
    getEl('tab-cook-buffs')?.addEventListener('click', () => { activeKitchenTab = 'buffs'; openKitchenModal(); });

    // Gắn Sự Kiện Nút Nấu & Ăn
    const mbody = getEl('mbody');
    if (mbody) {
        mbody.querySelectorAll('[data-cook]').forEach(btn => {
            btn.addEventListener('click', (e) => cookRecipe(/** @type {HTMLElement} */(e.currentTarget).dataset.cook));
        });
        mbody.querySelectorAll('[data-eat]').forEach(btn => {
            btn.addEventListener('click', (e) => eatDish(/** @type {HTMLElement} */(e.currentTarget).dataset.eat));
        });
    }
}

// ============================================================================
// 7. TIÊM NHÀ BẾP TỰ ĐỘNG VÀO NÔNG TRẠI (BỎ KHÁM PHÁ THEO YÊU CẦU)
// ============================================================================
export function injectCookingButton() {
    patchGameMechanics();
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

// Chạy an toàn khi import
if (typeof window !== 'undefined') {
    patchGameMechanics();
    const tryInject = () => { initCookingState(); injectCookingButton(); };
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', tryInject); }
    else { setTimeout(tryInject, 500); setTimeout(tryInject, 1500); }

    const observer = new MutationObserver(() => injectCookingButton());
    setTimeout(() => {
        const root = document.querySelector('#star-tavern-farm-root')?.shadowRoot;
        if (root) observer.observe(root, { childList: true, subtree: true });
    }, 1000);
}